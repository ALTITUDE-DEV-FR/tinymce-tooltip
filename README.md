# tinymce-tooltip
Make a Tooltip Plugin in your content TinyMCE !

# How to set the plugin in TinyMCE ?

1.Add a tooltip to plugins list.

```js
		tinymce.init({
			selector: '.editorTiny',
			plugins: 'tooltip'
		});
```

2. load the file.js before tinyMCE init

   example:
   <script src="/js/plugins/tooltip.js"></script>
   <script>
    tinymce.init({
			selector: '.editorTiny',
			plugins: 'tooltip'
		});
   </script>

3.Make a small CSS in your front-end

```css
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
.tooltip .tooltiptext {
  visibility: hidden;
  min-width: 120px;
  bottom: 110%;
  left: 50%;
  font-size: 14px;
  margin-left: -60px;
  background-color: #000000de;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
```
