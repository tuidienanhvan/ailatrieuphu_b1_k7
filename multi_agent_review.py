"""
Multi-Agent Code Review System
Gọi 4 AI models song song để phân tích và đề xuất cải thiện project
"""

import asyncio
import aiohttp
import json
import os
from pathlib import Path
from typing import List, Dict

# Cấu hình
LLM_MUX_URL = "http://localhost:8317/v1/chat/completions"
PROJECT_ROOT = Path(__file__).parent

# 10 Agents - Mỗi agent dùng 1 Gemini model khác nhau
AGENTS = [
    {
        "name": "Security Auditor",
        "model": "gemini-2.5-flash",
        "role": "Tìm lỗ hổng bảo mật, XSS, injection",
        "files": ["src/features/game/data/game-api.ts"]
    },
    {
        "name": "Performance Optimizer",
        "model": "gemini-2.5-flash-lite",
        "role": "Tối ưu performance, re-render",
        "files": ["src/App.tsx", "src/features/game/hooks/play/*.ts"]
    },
    {
        "name": "Code Quality Checker",
        "model": "gemini-3-flash",
        "role": "Code smells, duplicate code",
        "files": ["src/features/game/components/play/*.tsx"]
    },
    {
        "name": "Architecture Reviewer",
        "model": "gemini-3-pro-preview",
        "role": "Cấu trúc dự án, state management",
        "files": ["src/features/game/store/**/*.ts"]
    },
    {
        "name": "UI/UX Specialist",
        "model": "gemini-2.5-computer-use-preview-10-2025",
        "role": "Accessibility, responsive design",
        "files": ["src/pages/*.tsx", "index.css"]
    },
    {
        "name": "Data Flow Analyst",
        "model": "claude-sonnet-4-5",
        "role": "Props drilling, data flow issues",
        "files": ["src/features/game/types/*.ts"]
    },
    {
        "name": "Error Handler",
        "model": "claude-sonnet-4-5-thinking",
        "role": "Error handling, edge cases",
        "files": ["src/features/game/utils/*.ts"]
    },
    {
        "name": "API Integration Expert",
        "model": "gemini-3-pro-image",
        "role": "API calls, async operations",
        "files": ["src/features/game/data/*.ts"]
    },
    {
        "name": "State Management Pro",
        "model": "claude-opus-4-5-thinking",
        "role": "Zustand store optimization",
        "files": ["src/features/game/store/slices/*.ts"]
    },
    {
        "name": "Component Design Guru",
        "model": "gpt-oss-120b-medium",
        "role": "Component reusability, composition",
        "files": ["src/features/game/components/**/*.tsx"]
    }
]



def read_code_files(file_patterns: List[str]) -> str:
    """Đọc nội dung các file code theo patterns"""
    code_content = []
    
    for pattern in file_patterns:
        if "**" in pattern:
            # Glob pattern
            base_path = str(PROJECT_ROOT / pattern.split("**")[0])
            files = list(PROJECT_ROOT.glob(pattern))
        else:
            files = [PROJECT_ROOT / pattern]
        
        for file_path in files[:5]:  # Giới hạn 5 files/pattern
            if file_path.exists() and file_path.is_file():
                try:
                    content = file_path.read_text(encoding='utf-8')
                    rel_path = file_path.relative_to(PROJECT_ROOT)
                    code_content.append(f"\n### File: {rel_path}\n```\n{content[:2000]}\n```")
                except Exception as e:
                    print(f"⚠️ Không đọc được {file_path}: {e}")
    
    return "\n".join(code_content)


async def call_agent(session: aiohttp.ClientSession, agent: Dict) -> Dict:
    """Gọi 1 agent để phân tích code"""
    print(f"🤖 Starting {agent['name']} ({agent['model']})...")
    
    # Đọc code files
    code_content = read_code_files(agent['files'])
    
    # Tạo prompt
    prompt = f"""Bạn là **{agent['name']}**.

**Vai trò:** {agent['role']}

**Code cần review:**
{code_content}

**Yêu cầu:**
1. Liệt kê 3-5 vấn đề quan trọng nhất
2. Mỗi vấn đề gồm:
   - File và dòng code
   - Mô tả vấn đề
   - Code fix đề xuất (nếu có)

**Format output:**
```json
{{
  "agent": "{agent['name']}",
  "issues": [
    {{
      "file": "src/...",
      "line": 42,
      "severity": "high|medium|low",
      "description": "...",
      "suggestion": "..."
    }}
  ]
}}
```
"""
    
    try:
        async with session.post(
            LLM_MUX_URL,
            json={
                "model": agent['model'],
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3
            },
            timeout=aiohttp.ClientTimeout(total=120)
        ) as response:
            result = await response.json()
            content = result['choices'][0]['message']['content']
            
            print(f"✅ {agent['name']} hoàn thành!")
            
            return {
                "agent": agent['name'],
                "model": agent['model'],
                "response": content
            }
    
    except Exception as e:
        print(f"❌ {agent['name']} lỗi: {e}")
        return {
            "agent": agent['name'],
            "model": agent['model'],
            "error": str(e)
        }


async def main():
    """Chạy 4 agents song song"""
    print("=" * 60)
    print("🚀 Multi-Agent Code Review System")
    print("=" * 60)
    print(f"📁 Project: {PROJECT_ROOT}")
    print(f"🤖 Agents: {len(AGENTS)}\n")
    
    async with aiohttp.ClientSession(headers={"Content-Type": "application/json"}) as session:
        # Chạy 4 agents ĐỒNG THỜI
        results = await asyncio.gather(*[
            call_agent(session, agent) for agent in AGENTS
        ])
    
    # Lưu kết quả
    output_file = PROJECT_ROOT / "code_review_results.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 60)
    print(f"📄 Kết quả đã lưu: {output_file}")
    print("=" * 60)
    
    # In tóm tắt
    print("\n📊 TÓM TẮT:\n")
    for result in results:
        if 'error' in result:
            print(f"❌ {result['agent']}: {result['error']}")
        else:
            print(f"✅ {result['agent']} ({result['model']})")
            print(f"   Response: {len(result['response'])} characters\n")


if __name__ == "__main__":
    print("⚠️  Đảm bảo llm-mux đang chạy: llm-mux")
    print("⚠️  Cần cài: pip install aiohttp\n")
    
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n\n⛔ Đã dừng bởi người dùng")
