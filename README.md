# Finder Favorites
This extension is makes it easier to access the folders in the sidebar of your finder. However, it does not work when its published through the extension store because it requires a build step to work correctly.

The build step allows for the extension to generate commands so that each folder will appear like an application. Eg when you search for Safari on Raycast.

# Installation

### Step 1 - Clone the repository
```
git clone https://github.com/enricomilli/finder-favorites.git
```

### Step 2 - Build the extension
```
npm run build
```

### Step 3 - Add the extension to Raycast
- Open Raycast and search for import extension
- Browser to where you cloned the repository
- Hit open on the finder-favorites folder


# Extension Screenshots/Description
![Screenshot of Finder Favorites Search 1](/assets/search-sc-1.jpg?raw=true "")
- This extensions allows for searching of finder folders in Raycast without having to click into a finder search extension.

![Screenshot of Finder Favorites](/assets/finder-sc.png?raw=true "")
- In the build step it will generate commands for all the folders in the favorites sidebar

### Congrats you now have easy access to your folders 
![Screenshot of Finder Favorites Search 2](/assets/search-sc-2.jpg?raw=true "")
