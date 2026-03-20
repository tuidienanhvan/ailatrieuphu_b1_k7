@echo off
echo ==============================================================================
echo Replace GitHub repo with local code (khong xoa file cu, bo node_modules)
echo ==============================================================================

echo.
echo [1] Khoi tao repo...
git init

echo.
echo [2] Them node_modules vao .gitignore...
echo node_modules/ >> .gitignore
echo .env >> .gitignore

echo.
echo [3] Them remote GitHub...
git remote add origin https://github.com/tuidienanhvan/ailatrieuphu_b1_k7.git

echo.
echo [4] Kiem tra remote...
git remote -v

echo.
echo [5] Keo repo tu GitHub ve de dong bo (tranh loi unrelated histories)...
git pull origin main --allow-unrelated-histories

echo.
echo [6] Kiem tra trang thai repo...
git status

echo.
echo [7] Them toan bo file moi (tru node_modules)...
git add .

echo.
echo [8] Commit thay doi...
git commit -m "replace old repo with local code"

echo.
echo [9] Doi branch sang main...
git branch -M main

echo.
echo [10] Push len GitHub (Force push de ghi de noi dung cu)...
git push -u origin main --force

echo.
echo ==============================================================================
echo Hoan tat! Nhan phim bat ky de thoat.
pause
