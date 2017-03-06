;(function(){

  // Main function, calls drawCanvas(...) in the right way
  var JsBarcode = function(image, content, options, validFunction){
    console.log('content: %o', content);
    // If the image is a string, query select call again
    if(typeof image === "string"){
      image = document.querySelector(image);
      JsBarcode(image, content, options, validFunction);
    }
    // If image, draw on canvas and set the uri as src
    else if(typeof HTMLCanvasElement !== 'undefined' && image instanceof HTMLImageElement){
      canvas = document.createElement('canvas');
      drawCanvas(canvas, content, options, validFunction);
      image.setAttribute("src", canvas.toDataURL());
    }
    // If canvas, just draw
    else if(image.getContext){
      drawCanvas(image, content, options, validFunction);
    }
    else{
      throw new Error("Not supported type to draw on.");
    }
  }

  // The main function, handles everything with the modules and draws the image
  var drawCanvas = function(canvas, content, options, validFunction) {

    // This tries to call the valid function only if it's specified. Otherwise nothing happens
    var validFunctionIfExist = function(valid){
      if(validFunction){
        validFunction(valid);
      }
    };

    // Merge the user options with the default
    options = merge(JsBarcode.defaults, options);

    // Fix the margins
    options.marginTop = options.marginTop | options.margin;
    options.marginBottom = options.marginBottom | options.margin;
    options.marginRight = options.marginRight | options.margin;
    options.marginLeft = options.marginLeft | options.margin;

    //Abort if the browser does not support HTML5 canvas
    if (!canvas.getContext) {
      throw new Error('The browser does not support canvas.');
    }

    // Automatically choose barcode if format set to "auto"...
    if(options.format == "auto"){
      var encoder = new (JsBarcode.autoSelectEncoder(content))(content);
    }
    // ...or else, get by name
    else{
      var encoder = new (JsBarcode.getModule(options.format))(content);
    }

    //Abort if the barcode format does not support the content
    if(!encoder.valid()){
      validFunctionIfExist(false);
      if(!validFunction){
        throw new Error('The data is not valid for the type of barcode.');
      }
      return;
    }

    // Set the binary to a cached version if possible
    var cachedBinary = JsBarcode.getCache(options.format, content);
    if(cachedBinary){
      var binary = cachedBinary;
    }
    else{
      // Encode the content
      var binary = encoder.encoded();
      // Cache the encoding if it will be used again later
      JsBarcode.cache(options.format, content, binary);
    }

    // Get the canvas context
    var ctx = canvas.getContext("2d");

    // Set font
    var font = options.fontOptions + " " + options.fontSize + "px "+options.font;
    ctx.font = font;

    // Set the width and height of the barcode
    var width = binary.length*options.width;
    // Replace with width of the text if it is wider then the barcode
    var textWidth = ctx.measureText(encoder.getText()).width;
    if(options.displayValue && width < textWidth){
      if(options.textAlign == "center"){
        var barcodePadding = Math.floor((textWidth - width)/2);
      }
      else if(options.textAlign == "left"){
        var barcodePadding = 0;
      }
      else if(options.textAlign == "right"){
        var barcodePadding = Math.floor(textWidth - width);
      }

      width = textWidth;
    }
    // Make sure barcodePadding is not undefined
    var barcodePadding = barcodePadding || 0;

    canvas.width = width + options.marginLeft + options.marginRight;

    // Set extra height if the value is displayed under the barcode. Multiplication with 1.3 t0 ensure that some
    //characters are not cut in half
    canvas.height = options.height
      + (options.displayValue ? options.fontSize : 0)
      + options.textMargin
      + options.marginTop
      + options.marginBottom;

    // Paint the canvas
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(options.background){
      ctx.fillStyle = options.background;
      ctx.fillRect(0,0,canvas.width, canvas.height);
    }

    // Creates the barcode out of the encoded binary
    ctx.fillStyle = options.lineColor;
    for(var i=0;i<binary.length;i++){
      var x = i*options.width + options.marginLeft + barcodePadding;
      if(binary[i] == "1"){
        ctx.fillRect(x, options.marginTop, options.width, options.height);
      }
    }

    // Draw the text if displayValue is set
    if(options.displayValue){
      var x, y;

      y = options.height + options.textMargin + options.marginTop;

      ctx.font = font;
      ctx.textBaseline = "bottom";
      ctx.textBaseline = 'top';

      // Draw the text in the correct X depending on the textAlign option
      if(options.textAlign == "left" || barcodePadding > 0){
        x = options.marginLeft;
        ctx.textAlign = 'left';
      }
      else if(options.textAlign == "right"){
        x = canvas.width - options.marginRight;
        ctx.textAlign = 'right';
      }
      //In all other cases, center the text
      else{
        x = canvas.width / 2;
        ctx.textAlign = 'center';
      }

      ctx.fillText(encoder.getText(), x, y);
    }

    // Send a confirmation that the generation was successful to the valid function if it does exist
    validFunctionIfExist(true);
  };

  JsBarcode._modules = [];

  // Add a new module sorted in the array
  JsBarcode.register = function(module, regex, priority){
    var position = 0;
    if(typeof priority === "undefined"){
      position = JsBarcode._modules.length - 1;
    }
    else{
      for(var i=0;i<JsBarcode._modules.length;i++){
        position = i;
        if(!(priority < JsBarcode._modules[i].priority)){
          break;
        }
      }
    }

    // Add the module in position position
    JsBarcode._modules.splice(position, 0, {
      "regex": regex,
      "module": module,
      "priority": priority
    });
  };

  // Get module by name
  JsBarcode.getModule = function(name){
    for(var i in JsBarcode._modules){
      if(name.search(JsBarcode._modules[i].regex) !== -1){
        return JsBarcode._modules[i].module;
      }
    }
    throw new Error('Module ' + name + ' does not exist or is not loaded.');
  };

  // If any format is valid with the content, return the format with highest priority
  JsBarcode.autoSelectEncoder = function(content){
    for(var i in JsBarcode._modules){
      var barcode = new (JsBarcode._modules[i].module)(content);
      if(barcode.valid(content)){
        return JsBarcode._modules[i].module;
      }
    }
    throw new Error("Can't automatically find a barcode format matching the string '" + content + "'");
  };

  // Defining the cache dictionary
  JsBarcode._cache = {};

  // Cache a regerated barcode
  JsBarcode.cache = function(format, input, output){
    if(!JsBarcode._cache[format]){
      JsBarcode._cache[format] = {};
    }
    JsBarcode._cache[format][input] = output;
  };

  // Get a chached barcode
  JsBarcode.getCache = function(format, input){
    if(JsBarcode._cache[format]){
      if(JsBarcode._cache[format][input]){
        return JsBarcode._cache[format][input];
      }
    }
    return "";
  };

  // Detect if the code is running under nodejs
  JsBarcode._isNode = false;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = JsBarcode;	// Export to nodejs
    //JsBarcode._isNode = true;

    //Register all modules in ./barcodes/
    //var path = require("path");
    //var dir = path.join(__dirname, "barcodes");
    //var files = require("fs").readdirSync(dir);
    //for(var i in files){
    //  var barcode = require(path.join(dir, files[i]));
    //  barcode.register(JsBarcode);
    //}
  }

  //Regsiter JsBarcode for the browser
  if(typeof window !== 'undefined'){
    window.JsBarcode = JsBarcode;
  }

  // Register JsBarcode as an jQuery plugin if jQuery exist
  if (typeof jQuery !== 'undefined') {
    jQuery.fn.JsBarcode = function(content, options, validFunction){
      JsBarcode(this.get(0), content, options, validFunction);
      return this;
    };
  }

  // All the default options. If one is not set.
  JsBarcode.defaults = {
    width: 2,
    height:	100,
    format:	"auto",
    displayValue: true,
    fontOptions: "",
    font: "monospace",
    textAlign: "center",
    textMargin: 2,
    fontSize: 14,
    background: "#fff",
    lineColor: "#000",
    margin: 10,
    marginTop: undefined,
    marginBottom: undefined,
    marginLeft: undefined,
    marginRight: undefined
  };

  // Function to merge the default options with the default ones
  var merge = function(m1, m2) {
    var newMerge = {};
    for (var k in m1) {
      newMerge[k] = m1[k];
    }
    for (var k in m2) {
      if(typeof m2[k] !== "undefined"){
        newMerge[k] = m2[k];
      }
    }
    return newMerge;
  };
  function CODE128(string, code) {
    code = code || "B";

    this.string = string + "";

    this.valid = valid;

    this.getText = function() {
      return this.string;
    };

    //The public encoding function
    this.encoded = function() {
      return calculate["code128" + code](string);
    }

    //Data for each character, the last characters will not be encoded but are used for error correction
    var code128b = [
      [" ", "11011001100", 0],
      ["!", "11001101100", 1],
      ["\"", "11001100110", 2],
      ["#", "10010011000", 3],
      ["$", "10010001100", 4],
      ["%", "10001001100", 5],
      ["&", "10011001000", 6],
      ["'", "10011000100", 7],
      ["(", "10001100100", 8],
      [")", "11001001000", 9],
      ["*", "11001000100", 10],
      ["+", "11000100100", 11],
      [",", "10110011100", 12],
      ["-", "10011011100", 13],
      [".", "10011001110", 14],
      ["/", "10111001100", 15],
      ["0", "10011101100", 16],
      ["1", "10011100110", 17],
      ["2", "11001110010", 18],
      ["3", "11001011100", 19],
      ["4", "11001001110", 20],
      ["5", "11011100100", 21],
      ["6", "11001110100", 22],
      ["7", "11101101110", 23],
      ["8", "11101001100", 24],
      ["9", "11100101100", 25],
      [":", "11100100110", 26],
      [";", "11101100100", 27],
      ["<", "11100110100", 28],
      ["=", "11100110010", 29],
      [">", "11011011000", 30],
      ["?", "11011000110", 31],
      ["@", "11000110110", 32],
      ["A", "10100011000", 33],
      ["B", "10001011000", 34],
      ["C", "10001000110", 35],
      ["D", "10110001000", 36],
      ["E", "10001101000", 37],
      ["F", "10001100010", 38],
      ["G", "11010001000", 39],
      ["H", "11000101000", 40],
      ["I", "11000100010", 41],
      ["J", "10110111000", 42],
      ["K", "10110001110", 43],
      ["L", "10001101110", 44],
      ["M", "10111011000", 45],
      ["N", "10111000110", 46],
      ["O", "10001110110", 47],
      ["P", "11101110110", 48],
      ["Q", "11010001110", 49],
      ["R", "11000101110", 50],
      ["S", "11011101000", 51],
      ["T", "11011100010", 52],
      ["U", "11011101110", 53],
      ["V", "11101011000", 54],
      ["W", "11101000110", 55],
      ["X", "11100010110", 56],
      ["Y", "11101101000", 57],
      ["Z", "11101100010", 58],
      ["[", "11100011010", 59],
      ["\\", "11101111010", 60],
      ["]", "11001000010", 61],
      ["^", "11110001010", 62],
      ["_", "10100110000", 63],
      ["`", "10100001100", 64],
      ["a", "10010110000", 65],
      ["b", "10010000110", 66],
      ["c", "10000101100", 67],
      ["d", "10000100110", 68],
      ["e", "10110010000", 69],
      ["f", "10110000100", 70],
      ["g", "10011010000", 71],
      ["h", "10011000010", 72],
      ["i", "10000110100", 73],
      ["j", "10000110010", 74],
      ["k", "11000010010", 75],
      ["l", "11001010000", 76],
      ["m", "11110111010", 77],
      ["n", "11000010100", 78],
      ["o", "10001111010", 79],
      ["p", "10100111100", 80],
      ["q", "10010111100", 81],
      ["r", "10010011110", 82],
      ["s", "10111100100", 83],
      ["t", "10011110100", 84],
      ["u", "10011110010", 85],
      ["v", "11110100100", 86],
      ["w", "11110010100", 87],
      ["x", "11110010010", 88],
      ["y", "11011011110", 89],
      ["z", "11011110110", 90],
      ["{", "11110110110", 91],
      ["|", "10101111000", 92],
      ["}", "10100011110", 93],
      ["~", "10001011110", 94],
      [String.fromCharCode(127), "10111101000", 95],
      [String.fromCharCode(128), "10111100010", 96],
      [String.fromCharCode(129), "11110101000", 97],
      [String.fromCharCode(130), "11110100010", 98],
      [String.fromCharCode(131), "10111011110", 99],
      [String.fromCharCode(132), "10111101110", 100],
      [String.fromCharCode(133), "11101011110", 101],
      [String.fromCharCode(134), "11110101110", 102],
      //Start codes
      [String.fromCharCode(135), "11010000100", 103],
      [String.fromCharCode(136), "11010010000", 104],
      [String.fromCharCode(137), "11010011100", 105]];

    //The end bits
    var endBin = "1100011101011";

    //Use the regexp variable for validation
    function valid() {
      if (this.string.search(/^[!-~ ]+$/) == -1) {
        return false;
      }
      return true;
    }

    //The encoder function that return a complete binary string. Data need to be validated before sent to this function
    //This is general calculate function, which is called by code specific calculate functions
    function calculateCode128(string, encodeFn, startCode, checksumFn) {
      var result = "";

      //Add the start bits
      result += encodingById(startCode);

      //Add the encoded bits
      result += encodeFn(string);

      //Add the checksum
      result += encodingById(checksumFn(string, startCode));

      //Add the end bits
      result += endBin;

      return result;
    }

    //Code specific calculate functions
    var calculate = {
      code128B: function(string) {
        return calculateCode128(string, encodeB, 104, checksumB);
      },
      code128C: function(string) {
        string = string.replace(/ /g, "");
        return calculateCode128(string, encodeC, 105, checksumC);
      }
    }

    //Encode the characters (128 B)
    function encodeB(string) {
      var result = "";
      for (var i = 0; i < string.length; i++) {
        result += encodingByChar(string[i]);
      }
      return result;
    }

    //Encode the characters (128 C)
    function encodeC(string) {
      var result = "";
      for (var i = 0; i < string.length; i += 2) {
        result += encodingById(parseInt(string.substr(i, 2)));
      }
      return result;
    }

    //Calculate the checksum (128 B)
    function checksumB(string, startCode) {
      var sum = 0;
      for (var i = 0; i < string.length; i++) {
        sum += weightByCharacter(string[i]) * (i + 1);
      }
      return (sum + startCode) % 103;
    }

    //Calculate the checksum (128 C)
    function checksumC(string, startCode) {
      var sum = 0;
      var w = 1;
      for (var i = 0; i < string.length; i += 2) {
        sum += parseInt(string.substr(i, 2)) * (w);
        w++;
      }
      return (sum + startCode) % 103;
    }

    //Get the encoded data by the id of the character
    function encodingById(id) {
      for (var i = 0; i < code128b.length; i++) {
        if (code128b[i][2] == id) {
          return code128b[i][1];
        }
      }
    }

    //Get the id (weight) of a character
    function weightByCharacter(character) {
      for (var i = 0; i < code128b.length; i++) {
        if (code128b[i][0] == character) {
          return code128b[i][2];
        }
      }
    }

    //Get the encoded data of a character
    function encodingByChar(character) {
      for (var i = 0; i < code128b.length; i++) {
        if (code128b[i][0] == character) {
          return code128b[i][1];
        }
      }
    }
  }

  function CODE128B(string) {
    return new CODE128(string, "B");
  }
  function CODE128C(string) {
    return new CODE128(string, "C");
  }


//Required to register for both browser and nodejs
  var register = function(core) {
    core.register(CODE128B, /^CODE128(.?B)?$/i, 2);
    core.register(CODE128C, /^CODE128.?C$/i, 2);
  }
  try {
    register(JsBarcode)
  } catch ( e ) {}
  try {
    module.exports.register = register
  } catch ( e ) {}

})();
