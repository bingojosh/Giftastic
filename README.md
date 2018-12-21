# Giftastic

In this application a preset array of strings is printed to the DOM as buttons. By pressing the buttons, the user can search Giphy libraries via ajax calls to the Giphy API for gifs corresponding to what it says on the button. 10 of those gifs will be displayed as still images. The user can play the animated version of those gifs by clicking them and may return them to still images the same way. 

Additionally, the user may add to the list of searchable terms by inputting any string into the input field and clicking "Add a Meme". This will add a button to the top of the page with their desired term which can then be clicked to return the gifs the user desires. 

All the gifs are accompanied by their "rating" which is displayed as a caption beneath the image. This data is also recieved from the Giphy API via ajax call. 