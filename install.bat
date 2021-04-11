@echo off
echo Installing Node Modules...
npm install
echo Downloading Unzip...
powershell.exe Invoke-WebRequest http://stahlworks.com/dev/unzip.exe -OutFile unzip.exe
echo Downloading PDF.JS...
mkdir src/pdf
powershell.exe Invoke-WebRequest -Uri https://github-releases.githubusercontent.com/1663468/2be38180-ee3c-11ea-9530-ebcbabac2ac3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20210202%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20210202T063505Z&X-Amz-Expires=300&X-Amz-Signature=545fdbba77d1d2072b9cb21f9de7e7ce815047ee4e74a716575d1be753a78700&X-Amz-SignedHeaders=host&actor_id=53553315&key_id=0&repo_id=1663468&response-content-disposition=attachment%3B%20filename%3Dpdfjs-2.6.347-dist.zip&response-content-type=application%2Foctet-stream -OutFile src/pdf/pdf.zip
cd src/pdf/
unzip pdf.zip
echo FINISHED!