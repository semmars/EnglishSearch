# EnglishSearch
A very simple web GUI to use OXford English dictionary API.

1.Web GUI sends requests in JSON to Fastapi which is running in the background.

2.Fastapi forwards the requests to Oxford English Dictionary API and fetches the results in a very complex JSON. The Fastapi then decodes the JSON file into a simple version JSON and forwards it to Web GUI.
