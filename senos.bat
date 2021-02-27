@echo off
goto setupEnvironment
:setupEnvironment
set author=Ben Siebert and Lukas Birke
set version=1.0
set startCmd=npm start
set buildCmd=npm run make
title SenOS Developer Utils v1.0 by %author%
cls
goto main

:main
echo.
echo Choose one of the following options
echo -----------------------------------
echo.
echo [1] Start SenOS
echo [2] Build SenOS
echo [3] Exit
echo.
set /p choosen=Type a Number and press RETURN: 

if "%choosen%" == "1" (
	goto start
) else if "%choosen%" == "2" (
	goto build
) else if "%choosen%" == "3" (
	goto end
) else (
	cls
	echo.
	echo Abort.
	goto main
)

:start
cls
cmd.exe /c %startCmd%
echo.
cls
title SenOS Developer Utils v1.0 by %author%
echo Program exit.
goto main

:build
cls
cmd.exe /c %buildCmd%
echo.
cls
title SenOS Developer Utils v1.0 by %author%
echo Build complete with %errorlevel% errors!
goto main

:end
cls
echo.
echo Press any key to exit.
echo.
pause > nul