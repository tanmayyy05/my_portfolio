@REM ----------------------------------------------------------------------------
@REM Apache Maven Wrapper startup batch script
@REM ----------------------------------------------------------------------------

@echo off
setlocal

set WRAPPER_JAR=.mvn\wrapper\maven-wrapper.jar
set WRAPPER_PROPS=.mvn\wrapper\maven-wrapper.properties

if not exist "%WRAPPER_JAR%" (
  echo Downloading Maven Wrapper...
  for /f "tokens=2 delims==" %%A in ('findstr "wrapperUrl" "%WRAPPER_PROPS%"') do set WRAPPER_URL=%%A
  powershell -Command "Invoke-WebRequest -Uri '%WRAPPER_URL%' -OutFile '%WRAPPER_JAR%'"
)

if "%JAVA_HOME%"=="" (
  set JAVACMD=java
) else (
  set JAVACMD=%JAVA_HOME%\bin\java
)

"%JAVACMD%" -classpath "%WRAPPER_JAR%" "-Dmaven.multiModuleProjectDirectory=%cd%" org.apache.maven.wrapper.MavenWrapperMain %*

endlocal
