&:: Get request

curl -X GET "http://192.168.1.34:3000/u/hayri" -m 30 -v em


&:: Post Request with Body

curl -X POST https://quideck.herokuapp.com/create_folder/hayri -H "Content-Type: application/json" -d "{\"folder_name\": \"hahaaaa yes\", \"parent_id\": 3, \"folder_type\": \"regular_folder\"}"


&:: Put Request with Body

curl -X PUT http://192.168.1.34:3000/updatedir/hayri -H "Content-Type: application/json" -d "{\"item_id\": 8, \"parent_id\": 3, \"item_name\": \"file_1\", \"direction\": \"parent\"}"


&:: Delete Request With Body

curl -X DELETE http://192.168.1.34:3000/u/hayri/delete_item -H "Content-Type: application/json" -d "{\"item_id\": 43, \"parent_id\": 1}"