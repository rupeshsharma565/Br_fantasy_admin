npm run build
git add .
git commit -m "Script Commit "
git push origin master
rm -rf ../buildadmin/public
cp -frp build -T ../buildadmin/public
