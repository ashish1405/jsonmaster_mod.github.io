let languages = {
	swiftCodableStruct: {
		file: "Swift-Codable-Struct.json",
		name: "Swift Codable Struct"
	},
	swiftCodableClass: {
		file: "Swift-Codable-Class.json",
		name: "Swift Codable Class"
	}
}

var selectedLanguage = languages.swiftCodableStruct
var inputTextArea;
var outputTextArea;

$(document).ready(function() {

	inputTextArea = CodeMirror.fromTextArea(document.getElementById('input'), {
        mode: {name: "javascript", json: true},
        theme: "default",
        lineNumbers: true,
        indentUnit: 4
    });  
  
    outputTextArea = CodeMirror.fromTextArea(document.getElementById('output'), {
        mode: "text/x-swift",
        theme: "default",
        lineNumbers: true,
        readOnly: true
    });

    inputTextArea.on("change", function(cm, change) {
    	inputChanged();
    });

    $('#rootClassName').bind('input propertychange', function() {
      inputChanged();
    });

    inputTextArea.setSize(null, $("#input").innerHeight());
    outputTextArea.setSize(null, $("#input").innerHeight());

   	$('#initializerCheckbox').change(function() {
        inputChanged();
    });

   	Object.keys(languages).forEach(function(key) {
   		let value = languages[key];
   		let element = $('<a class="dropdown-item" id="' + key + '" href="#">' + value.name + '</a>');
   		$("#dropdownMenuLanguage").append(element);
   	});

   	$('.dropdown-item').click(function () {
   		let key = this.id
   		selectedLanguage = languages[key]
   		updateSelectedLanguage();
   	});

   	updateSelectedLanguage();

    inputTextArea.setValue(examlpeJSON);
});

function inputChanged() {
	$.getJSON("./languages/" + selectedLanguage.file, function(language) {
		let input = inputTextArea.getValue();
		let builder = new FileBuilder(language);
		builder.isInitializers = $('#initializerCheckbox').is(':checked');
    builder.rootClassName = $('#rootClassName').val();

		let result = builder.classes(input);
		outputTextArea.setValue(result);
	});
}

function updateSelectedLanguage() {
	$("#dropdownMenuButtonLanguage").text(selectedLanguage.name);
	inputChanged();
}

let examlpeJSON = '{\n\t"test_int": 101,\n\t"test_bool": true,\n\t"test_string": "foo",\n\t"test_object": {\n\t\t"test_double": 1.12\n\t}\n}'