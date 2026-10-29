# Abdel’s Table — quick guide

## Files

- `index.html` is the home page, with the centered welcome text, Calgary drawing, and picture carousel.
- `menu.html` is the order page, with quantity boxes, live prices, and a receipt.
- `style.css` controls the cream and olive colors, spacing, layout, and phone view.
- `script.js` builds the menu, calculates prices, moves the pictures, and shows Calgary weather and time.
- `assets/family-meal.png` is the first carousel photo. The olive branch and Calgary drawings are small SVG image files.

## JavaScript in simple words

1. `menuItems` is an array. Each object stores one dish, its description, and price in cents.
2. The first `for` loop makes one menu card for each dish, including baklava and maqroud.
3. `calculateOrder()` reads the quantities with another `for` loop. It updates the subtotal, GST, total, and receipt.
4. The browser limits each quantity to a whole number from 0 to 20. JavaScript asks for at least one dish before making a receipt.
5. The carousel starts with the meal photo. The arrows move it, and `setInterval` changes it every four seconds. Pause stops the automatic change.
6. `fetch()` gets Calgary weather. `Date` shows the Calgary time and current year.

## Easy edits

- Change a price in `menuItems` (1850 means $18.50).
- Add a dish by copying one object in the array.
- Change `max="20"` to change the quantity limit.
- Change `4000` in `setInterval` to change how often the picture moves.

