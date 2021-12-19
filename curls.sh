curl --header "Content-Type: application/json" --request POST --data '{"login": "admin","password":"admin"}' http://localhost:3000/users
echo -e '\n'
curl --header "Content-Type: application/json" --request GET http://localhost:3000/users
echo -e '\n'