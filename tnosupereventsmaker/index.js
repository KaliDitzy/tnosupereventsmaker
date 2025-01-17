function set_label(ui_name, pos_x, pos_y, font_size) {
    var label = document.getElementById(ui_name + "-label");
    var input = document.getElementById(ui_name + "-input");
    label.style.position = "absolute";

    label.style.left = pos_x + "px";
    label.style.top = pos_y + "px";
    label.style.fontSize = font_size + "px";
    label.innerText = input.value;
}

function set_pic(ui_name) {
    var input = document.getElementById(ui_name + "-input");
    var pic = document.getElementById(ui_name + "-pic");
    var reader = new FileReader();

    reader.onload = function() { pic.setAttribute("src", this.result); }
    reader.readAsDataURL(input.files[0]);
}

function set_input_event(ui_name, pos_x, pos_y, font_size) {
    var input = document.getElementById(ui_name + "-input");
    input.addEventListener("input", function() { set_label(ui_name, pos_x, pos_y, font_size); });
}

function set_input_value(ui_name, value) {
    var input = document.getElementById(ui_name + "-input");
    input.value = value;
    input.dispatchEvent(new Event("input"));
}

function set_pic_event(ui_name) {
    var input = document.getElementById(ui_name + "-input");
    input.addEventListener("input", function() { set_pic(ui_name); });
}

function input() {
    set_input_value("country-name");
    set_input_value("faction-name");
    set_input_value("leader-name");
    set_input_value("party-name");
    set_input_value("ideology-name");
    set_input_value("next-election");
    set_input_value("national-focus-name");
    set_input_value("news-title");
    set_input_value("news-description");
    set_input_value("news-button");
    set_input_value("super-event-title");
    set_input_value("super-event-description");
    set_input_value("super-event-button");

    document.getElementById("country-flag-pic").setAttribute("src");
    document.getElementById("country-leader-pic").setAttribute("src");
    document.getElementById("ideology-icon-pic").setAttribute("src");
    document.getElementById("national-focus-icon-pic").setAttribute("src");
    document.getElementById("news-pic").setAttribute("src");
    document.getElementById("super-event-pic").setAttribute("src");
}

function base64ToBytes(base64) {
  const binString = atob(base64);
  return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
  const binString = Array.from(bytes, (byte) =>
    String.fromCodePoint(byte),
  ).join("");
  return btoa(binString);
}

function saveProgress() {
	var results = document.getElementById("results")
	results.innerText = "Something went wrong while saving."
	results.setAttribute('style', 'color: red;');
	
	var stream = "";
	stream += "2;|"; //version
	stream += document.getElementById("country-name-input").value+";|";
	stream += document.getElementById("faction-name-input").value+";|";
	stream += document.getElementById("leader-name-input").value+";|";
	stream += document.getElementById("party-name-input").value+";|";
	stream += document.getElementById("ideology-name-input").value+";|";
	stream += document.getElementById("next-election-input").value+";|";
	stream += document.getElementById("national-focus-name-input").value+";|";
	stream += document.getElementById("news-title-input").value+";|";
	stream += document.getElementById("news-description-input").value+";|";
	stream += document.getElementById("news-button-input").value+";|";
	stream += document.getElementById("super-event-title-input").value+";|";
	stream += document.getElementById("super-event-description-input").value+";|";
	stream += document.getElementById("super-event-button-input").value+";|";
	stream += document.getElementById("parties").value+";|";
	stream += document.getElementById("partycolors").value;
	
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stream));
	element.setAttribute('download', 'save.tnomk');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
	
	results.innerText = "File saved."
	results.setAttribute('style', 'color: green;');
}

function endLoadProgress(result) {
	var results = document.getElementById("results");
	results.innerText = "Something went wrong while reading your save file.";
	results.setAttribute('style', 'color: red;');
	
	result = result.split(",")[1]
	result = new TextDecoder().decode(base64ToBytes(result));
	
	data = result.split(";|")
	
	//convert version 0 to 1
	//simply change , to ;|
	
	if (data.length != 16)
	{
		var popup = confirm("WARNING: This save file may be corrupted, please confirm that you wish to continue with loading.");
		
		if (popup == false)
		{
			results.innerText = "Load cancelled.";
			return;
		}
	}
	else
	{
		if (data[0] != "2")
		{
			var popup = confirm("WARNING: This save file is anachronistic, this means that you are attempting to load either a newer or older version of the .tnomk format, are you sure you want to continue?");
			
			if (popup == false)
			{
				results.innerText = "Load cancelled.";
				return;
			}
		}
	}
	
	document.getElementById("country-name-input").value = data[1];
	document.getElementById("faction-name-input").value = data[2];
	document.getElementById("leader-name-input").value = data[3];
	document.getElementById("party-name-input").value = data[4];
	document.getElementById("ideology-name-input").value = data[5];
	document.getElementById("next-election-input").value = data[6];
	document.getElementById("national-focus-name-input").value = data[7];
	document.getElementById("news-title-input").value = data[8];
	document.getElementById("news-description-input").value = data[9];
	document.getElementById("news-button-input").value = data[10];
	document.getElementById("super-event-title-input").value = data[11];
	document.getElementById("super-event-description-input").value = data[12];
	document.getElementById("super-event-button-input").value = data[13];
	document.getElementById("parties").value = data[14];
	document.getElementById("partycolors").value = data[15];
	
	set_label("country-name", 220, -6, 14)
	set_label("faction-name", 220, 13, 14);
    set_label("leader-name", 220, 32, 14);
    set_label("party-name", 235, 68, 20);
    set_label("ideology-name", 235, 100, 20);
    set_label("next-election", 235, 120, 20);
    set_label("national-focus-name", 234, 158, 20);
    set_label("news-title", 103, 295, 15);
    set_label("news-description", 240, 340, 10);
    set_label("news-button", 230, 679, 12);
    set_label("super-event-title", 530, 0, 20);
    set_label("super-event-description", 595, 360, 19);
    set_label("super-event-button", 720, 548, 19);
	
	var element = document.createElement('a');
	element.setAttribute('onClick', 'UpdateChart();');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();
	
	document.body.removeChild(element);
	
	results.innerText = "Save loaded!";
	results.setAttribute('style', 'color: green;');
}

function startLoadProgress() {
	var results = document.getElementById("results")
	results.innerText = "Something went wrong while loading."
	results.setAttribute('style', 'color: red;');
	
	var input = document.getElementById("loadfile");
    var reader = new FileReader();

    reader.onload = function() { endLoadProgress(this.result); }
    reader.readAsDataURL(input.files[0]);
}

window.onload = function() {
    document.getElementById("loading").addEventListener("click", input);
	document.getElementById("loadfile").addEventListener("input", function() { startLoadProgress(); });
    set_input_event("country-name", 220, -6, 14);
    set_input_event("faction-name", 220, 13, 14);
    set_input_event("leader-name", 220, 32, 14);
    set_input_event("party-name", 235, 68, 20);
    set_input_event("ideology-name", 235, 100, 20);
    set_input_event("next-election", 235, 120, 20);
    set_input_event("national-focus-name", 234, 158, 20);
    set_input_event("news-title", 103, 295, 15);
    set_input_event("news-description", 240, 340, 10);
    set_input_event("news-button", 230, 679, 12);
    set_input_event("super-event-title", 530, 0, 20);
    set_input_event("super-event-description", 595, 360, 19);
    set_input_event("super-event-button", 720, 548, 19);
    set_pic_event("country-flag");
    set_pic_event("country-leader");
    set_pic_event("ideology-icon");
    set_pic_event("national-focus-icon");
    set_pic_event("news");
    set_pic_event("super-event");
	
	
};