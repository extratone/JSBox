// GENERAL
const monoFamily = `ui-monospace, Menlo, Monaco, "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro", "Fira Mono", "Droid Sans Mono", "Courier New", monospace`

function getParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
// END GENERAL

let defaultActionData = () => {
    return {
        "uuid": "99999999-9999-9999-9999-999999999999",
        "steps": [],
        "backingPlatforms": 3,
        "shortName":"",
        "shouldConfirm":false,
        "disposition": 3,
        "keyCommand": {
            "optionKey":false,
            "input":"",
            "controlKey":false,
            "commandKey":false,
            "type":"action",
            "discoverabilityTitle":"",
            "shiftKey": false
            },
        "logLevel": 2,
        "groupDisposition": 0,
        "notificationType": 2,
        "tintColor": "none",
        "actionDescription": "",
        "keyUseIcon": false,
        "icon": "",
        "visibility": 480,
        "backingIsSeparator": false,
        "groupUUID": "99999999-9999-9999-9999-999999999999",
        "assignTags": [],
        "name": ""
    };
};

let serialize = (form) => {
    let data = {};
    for(let e of form.elements) {
        if (e.type && e.type === 'checkbox') {
            data[e.id] = e.checked;
        }
        else if (e.type && e.type === 'radio') {
            if (e.checked) {
                data[e.name] = e.value;
            }
        }
        else {
            data[e.id] = e.value;
        }
    }
    return data;
};

let validateBase = (formData) => {
    return true
}

let formToData = (form) => {
    let base = defaultActionData();
    let data = serialize(form);
    //alert(JSON.stringify(data));
    //return base;
    if (data["shouldConfirm"] == "on") {
        data["shouldConfirm"] = true;
    }
    else {
        data["shouldConfirm"] = false;  
    }
    data["logLevel"] = parseInt(data["logLevel"]);
    data["notificationType"] = parseInt(data["notificationType"]);
    if (typeof data["assignTags"] === 'string') {
        if (data["assignTags"].length > 0) {
            data["assignTags"] = data["assignTags"].split(",").map(t => t.trim());
        }  
        else {
            data["assignTags"] = [];
        }
    }
    return {...base, ...data};
};

let formDataToURL = (data) => {
    let baseURL = "drafts://action?data=";
    let s = JSON.stringify(data);
    let installURL = baseURL + encodeURIComponent(s);
    return installURL;
};

// BEGIN Message
let convertStepForMessageFormData = (data) => {
    data["icon"] = "chat";
    data["tintColor"] = "green";
    let bodyTemplate = "[[draft]]";
    if (data["custom-template"] === 'custom') {
        bodyTemplate = data["message-content"];
    }
    let stepData = {
        "uuid": "",
        "type": "message",
        "isEnabled": true,
        "platforms": 3,
        "data": {
            "toRecipients": data["message-recipients"],
            "subjectTemplate": "",
            "bodyTemplate": bodyTemplate
        }
    };
    data["steps"] = [stepData];
    delete data["message-content"];
    delete data["message-recipients"];
    delete data["custom-template"];
}
let processMessageForm = (form) => {
    let formData = formToData(form);
    if (!validateBase(formData)) {
        alert("Complete all required fields");
        return;
    }
    convertStepForMessageFormData(formData);
    let url = formDataToURL(formData);
    //alert(url)
    window.open(url, "_self", false);
}
// END Message

// BEGIN Mail
let convertStepForMailFormData = (data) => {
    data["icon"] = "action_email_filled";
    data["tintColor"] = "blue";
    let subjectTemplate = "[[title]]";
    if (data["subject-template"] === 'custom') {
        subjectTemplate = data["subject-content"];
    }
    let bodyTemplate = "[[body]]";
    if (data["body-template"] === 'custom') {
        bodyTemplate = data["body-content"];
    }
    let stepData = {
        "uuid": "",
        "type": "mail",
        "isEnabled": true,
        "platforms": 3,
        "data": {
            "toRecipients": data["message-recipients-to"],
            "ccRecipients": data["message-recipients-cc"],
            "bccRecipients": data["message-recipients-bcc"],
            "subjectTemplate": subjectTemplate,
            "bodyTemplate": bodyTemplate,
            "sendAsHTML": "false",
            "sendInBackground": "false"
        }
    };
    data["steps"] = [stepData];
    delete data["subject-content"];
    delete data["body-content"];
    delete data["message-recipients-to"];
    delete data["message-recipients-cc"];
    delete data["message-recipients-bcc"];
}
let processMailForm = (form) => {
    let formData = formToData(form);
    if (!validateBase(formData)) {
        alert("Complete all required fields");
        return;
    }
    convertStepForMailFormData(formData);
    let url = formDataToURL(formData);
    //alert(url)
    window.open(url, "_self", false);
}
// END Mail

// onload setup
$(function() {
    $('legend.can-collapse').click(function () {
        if ($(this).hasClass('not-collapsed')) {
            $(this).removeClass('not-collapsed');
            $(this).addClass('collapsed');
        }
        else {
            $(this).removeClass('collapsed');
            $(this).addClass('not-collapsed');
        }
        $(this).parent().find('.fs-content').slideToggle("slow");
    });
});

// BEGIN Themes
const defaultTheme = {
  "name": "Light",
  "author": "Agile Tortoise, Inc.",
  "description": "Default light theme",
  "isDark": false,
  "scopes": {
    "text.normal": {
      "name": "Normal Text",
      "settings": {
        "foreground": "foreground",
        "fontStyle": "normal"
      }
    },
    "text.normal.large": {
      "name": "Large Text",
      "settings": {
        "foreground": "foreground",
        "fontSize": "large"
      }
    },
    "text.normal.extraLarge": {
      "name": "Extra Large Text",
      "settings": {
        "foreground": "foreground",
        "fontSize": "extraLarge"
      }
    },
    "text.normal.small": {
      "name": "Small Text",
      "settings": {
        "foreground": "foreground",
        "fontSize": "small"
      }
    },
    "text.normal.extraSmall": {
      "name": "Extra Small Text",
      "settings": {
        "foreground": "foreground",
        "fontSize": "extraSmall"
      }
    },
    "text.bold": {
      "name": "Bold",
      "settings": {
        "fontWeight": "bold"
      }
    },
    "text.bold.large": {
      "name": "Large Bold",
      "settings": {
        "fontWeight": "bold",
        "fontSize": "large"
      }
    },
    "text.bold.extraLarge": {
      "name": "Extra Large Bold",
      "settings": {
        "fontWeight": "bold",
        "fontSize": "extraLarge"
      }
    },
    "text.bold.small": {
      "name": "Small Bold",
      "settings": {
        "fontWeight": "bold",
        "fontSize": "small"
      }
    },
    "text.bold.extraSmall": {
      "name": "Extra Small Bold",
      "settings": {
        "fontWeight": "bold",
        "fontSize": "extraSmall"
      }
    },
    "text.italic": {
      "name": "Italic",
      "settings": {
        "fontStyle": "italic"
      }
    },
    "text.italic.large": {
      "name": "Large Italic",
      "settings": {
        "fontStyle": "italic",
        "fontSize": "large"
      }
    },
    "text.italic.extraLarge": {
      "name": "Extra Large Italic",
      "settings": {
        "fontStyle": "italic",
        "fontSize": "extraLarge"
      }
    },
    "text.italic.small": {
      "name": "Small Italic",
      "settings": {
        "fontStyle": "italic",
        "fontSize": "small"
      }
    },
    "text.italic.extraSmall": {
      "name": "Extra Small Italic",
      "settings": {
        "fontStyle": "italic",
        "fontSize": "extraSmall"
      }
    },
    "text.bolditalic": {
      "name": "Bold, Italic",
      "settings": {
        "fontStyle": "italic",
        "fontWeight": "bold"
      }
    },
    "text.bolditalic.large": {
      "name": "Large Bold, Italic",
      "settings": {
        "fontStyle": "italic",
        "fontWeight": "bold",
        "fontSize": "large"
      }
    },
    "text.bolditalic.extraLarge": {
      "name": "Extra Large Bold, Italic",
      "settings": {
        "fontStyle": "italic",
        "fontWeight": "bold",
        "fontSize": "extraLarge"
      }
    },
    "text.bolditalic.small": {
      "name": "Small Bold, Italic",
      "settings": {
        "fontStyle": "italic",
        "fontWeight": "bold",
        "fontSize": "small"
      }
    },
    "text.bolditalic.extraSmall": {
      "name": "Extra Small Bold, Italic",
      "settings": {
        "fontStyle": "italic",
        "fontWeight": "bold",
        "fontSize": "extraSmall"
      }
    },
    "text.monospace": {
      "name": "Monospace",
      "settings": {
        "fontStyle": "monospace"
      }
    },
    "text.monospace.large": {
      "name": "Large Monospace",
      "settings": {
        "fontStyle": "monospace",
        "fontSize": "large"
      }
    },
    "text.monospace.extraLarge": {
      "name": "Extra Large Monospace",
      "settings": {
        "fontStyle": "monospace",
        "fontSize": "extraLarge"
      }
    },
    "text.monospace.small": {
      "name": "Small Monospace",
      "settings": {
        "fontStyle": "monospace",
        "fontSize": "small"
      }
    },
    "text.monospace.extraSmall": {
      "name": "Extra Small Monospace",
      "settings": {
        "fontStyle": "monospace",
        "fontSize": "extraSmall"
      }
    },
    "text.monospace.bold": {
      "name": "Monospace Bold",
      "settings": {
        "fontStyle": "monospace",
        "fontWeight": "bold"
      }
    },
    "text.monospace.bold.large": {
      "name": "Large Monospace Bold",
      "settings": {
        "fontStyle": "monospace",
        "fontWeight": "bold",
        "fontSize": "large"
      }
    },
    "text.monospace.bold.extraLarge": {
      "name": "Extra Large Monospace Bold",
      "settings": {
        "fontStyle": "monospace",
        "fontWeight": "bold",
        "fontSize": "extraLarge"
      }
    },
    "text.monospace.bold.small": {
      "name": "Small Monospace Bold",
      "settings": {
        "fontStyle": "monospace",
        "fontWeight": "bold",
        "fontSize": "small"
      }
    },
    "text.monospace.bold.extraSmall": {
      "name": "Extra Small Monospace Bold",
      "settings": {
        "fontStyle": "monospace",
        "fontWeight": "bold",
        "fontSize": "small"
      }
    },
    "text.monospace.italic": {
      "name": "Monospace Italic",
      "settings": {
        "fontStyle": "monospace",
        "foreground": "foreground"
      }
    },
    "text.monospace.italic.large": {
      "name": "Large Monospace Italic",
      "settings": {
        "fontStyle": "monospace,italic",
        "fontSize": "large"
      }
    },
    "text.monospace.italic.extraLarge": {
      "name": "Extra Large Monospace Italic",
      "settings": {
        "fontStyle": "monospace,italic",
        "fontSize": "extraLarge"
      }
    },
    "text.monospace.italic.small": {
      "name": "Small Monospace Italic",
      "settings": {
        "fontStyle": "monospace,italic",
        "fontSize": "small"
      }
    },
    "text.monospace.italic.extraSmall": {
      "name": "Extra Small Monospace Italic",
      "settings": {
        "fontStyle": "monospace,italic",
        "fontSize": "extraSmall"
      }
    },
    "text.underline": {
      "name": "Underline",
      "settings": {
        "fontStyle": "underline"
      }
    },
    "text.heading": {
      "name": "Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading01": {
      "name": "Level 1 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading02": {
      "name": "Level 2 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading03": {
      "name": "Level 3 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading04": {
      "name": "Level 4 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading05": {
      "name": "Level 5 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.heading06": {
      "name": "Level 6 Heading",
      "settings": {
        "fontWeight": "bold",
        "foreground": "accent01"
      }
    },
    "text.link": {
      "name": "Link",
      "settings": {
        "foreground": "link"
      }
    },
    "text.activeLink": {
      "name": "Link which is tap/clickable",
      "settings": {
        "foreground": "activeLink"
      }
    },
    "text.quotation": {
      "name": "Quotation block",
      "settings": {
        "fontStyle": "italic"
      }
    },
    "text.url": {
      "name": "URL",
      "settings": {
        "foreground": "markup"
      }
    },
    "text.linkModeLink": {
      "name": "Link Mode Link",
      "settings": {
        "foreground": "link",
        "fontStyle": "underline"
      }
    },
    "text.strikethrough": {
      "name": "Strikethrough",
      "settings": {
        "fontStyle": "strikethrough",
        "foreground": "strikethrough"
      }
    },
    "markup": {
      "name": "Markup",
      "settings": {
        "foreground": "markup"
      }
    },
    "markup.heading": {
      "name": "Markup",
      "settings": {
        "foreground": "markup"
      }
    },
    "markup.quotation": {
      "name": "Markup",
      "settings": {
        "foreground": "markup"
      }
    },
    "markup.list": {
      "name": "Markup",
      "settings": {
        "foreground": "markup"
      }
    },
    "markup.link": {
      "name": "Markup",
      "settings": {
        "foreground": "markup"
      }
    },
    "markup.code": {
      "name": "Markup",
      "settings": {
        "foreground": "markup",
        "fontStyle": "monospace"
      }
    },
    "markup.addition": {
      "name": "Addition",
      "settings": {
        "fontStyle": "italic",
        "foreground": "addition"
      }
    },
    "markup.deletion": {
      "name": "Deletion",
      "settings": {
        "fontStyle": "italic",
        "foreground": "deletion"
      }
    },
    "markup.highlight": {
      "name": "Highlight",
      "settings": {
        "background": "highlight"
      }
    },
    "markup.substitution": {
      "name": "Substitution",
      "settings": {
        "fontStyle": "italic",
        "foreground": "substitution"
      }
    },
    "code.comment": {
      "name": "Comment",
      "settings": {
        "foreground": "comment"
      }
    },
    "code.inline": {
      "name": "Inline code",
      "settings": {
        "fontStyle": "monospace",
        "foreground": "code",
        "background": "codeBackground"
      }
    },
    "code.block": {
      "name": "Code block",
      "settings": {
        "fontStyle": "monospace",
        "foreground": "code"
      }
    },
    "code.literal": {
      "name": "Code block",
      "settings": {
        "foreground": "literal"
      }
    },
    "code.keyword": {
      "name": "Keyword",
      "settings": {
        "foreground": "keyword"
      }
    },
    "code.operator": {
      "name": "Operator",
      "settings": {
        "foreground": "markup"
      }
    },
    "code.punctuation": {
      "name": "Operator",
      "settings": {
        "foreground": "comment"
      }
    },
    "text.invisibles": {
      "name": "Invisible characters",
      "settings": {
        "fontStyle": "invisibles",
        "foreground": "invisibles"
      }
    },
    "color.accent01": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent01"
      }
    },
    "color.accent02": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent02"
      }
    },
    "color.accent03": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent03"
      }
    },
    "color.accent04": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent04"
      }
    },
    "color.accent05": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent05"
      }
    },
    "color.accent06": {
      "name": "Accent color",
      "settings": {
        "foreground": "accent06"
      }
    },
    "color.blue": {
      "name": "Blue color",
      "settings": {
        "foreground": "#017AFF"
      }
    },
    "color.indigo": {
      "name": "Blue color",
      "settings": {
        "foreground": "#6C00FA"
      }
    },
    "color.purple": {
      "name": "Purple color",
      "settings": {
        "foreground": "#953E96"
      }
    },
    "color.pink": {
      "name": "Pink color",
      "settings": {
        "foreground": "#F6509E"
      }
    },
    "color.red": {
      "name": "Red color",
      "settings": {
        "foreground": "#E0373E"
      }
    },
    "color.orange": {
      "name": "Orange color",
      "settings": {
        "foreground": "#F7831B"
      }
    },
    "color.yellow": {
      "name": "Yellow color",
      "settings": {
        "foreground": "#FFC726"
      }
    },
    "color.green": {
      "name": "Green color",
      "settings": {
        "foreground": "#60BA46"
      }
    },
    "color.black": {
      "name": "Black color",
      "settings": {
        "foreground": "#000000"
      }
    },
    "color.white": {
      "name": "White color",
      "settings": {
        "foreground": "#FFFFFF"
      }
    },
    "color.gray": {
      "name": "Gray color",
      "settings": {
        "foreground": "#989898"
      }
    }
  },
  "colors": {
    "editor": {
      "foreground": "#000000",
      "background": "#FFFFFF",
      "heading": "#600100",
      "strikethrough": "#444444",
      "comment": "#AEAEAE",
      "link": "#7E90BB",
      "activeLink": "#4A7BD5",
      "code": "#444444",
      "codeBackground": "#EFEFEF",
      "literal": "#32812B",
      "keyword": "#813631",
      "markup": "#B8B4A4",
      "addition": "#46C139",
      "deletion": "#EE0000",
      "substitution": "#F3A536",
      "highlight": "#FFFD80",
      "invisibles": "#CCCCCC",
      "accent01": "#600100",
      "accent02": "#580F32",
      "accent03": "#400F58",
      "accent04": "#0E1255",
      "accent05": "#014955",
      "accent06": "#165332"
    },
    "interface": {
      "tint": "#538AEF",
      "tintAlternate": "#7892C4",
      "textCaret": "#538AEF",
      "textSelection": "#7892C4",
      "textHighlight": "#F7F7F7",
      "textBackground": "#FFFFFF",
      "textForeground": "#000000",
      "background": "#FFFFFF",
      "backgroundCollection": "#F6F6F6",
      "promptBackground": "#F2F2F2",
      "promptButtonBackground": "#538AEF",
      "promptButtonForeground": "#FFFFFF",
      "promptButtonDestructiveBackground": "#C42429",
      "promptButtonDestructiveForeground": "#FFFFFF",
      "foreground": "#000000",
      "caption": "#666666",
      "actionBarBackground": "#DEE2EA",
      "actionBarKeyBackground": "#EFEFEF",
      "actionBarKeyForeground": "#666666",
      "flagged": "#FF8400",
      "move": "#42B8FF",
      "delete": "#CA2E26",
      "tagForeground": "#426FC0",
      "tagBackground": "#F6F6F6",
      "tagAddHighlight": "#E9FFF4",
      "tagRemoveHighlight": "#FFD5E1",
      "border": "#c2c2c2",
      "messageForeground": "#FFFFFF",
      "messageSuccess": "#83D58B",
      "messageInfo": "#A4ACB5",
      "messageWarning": "#F7EF76",
      "messageError": "#EE6462",
      "tintGray": "#808080",
      "tintRed": "#C42429",
      "tintPink": "#F64F9D",
      "tintOrange": "#E59A28",
      "tintYellow": "#E8D21E",
      "tintGreen": "#46C138",
      "tintIndigo": "#38CAD3",
      "tintBlue": "#0874A0",
      "tintViolet": "#734A8D",
      "widgetBackground": "#FFFFFF",
      "widgetBackgroundAlternate": "#F6F6F6",
      "widgetForeground": "#000000",
      "widgetForegroundAlternate": "#000000"
    }
  }
};
const defaultVisibleScopes = [
    'text.normal',
    'text.heading', 'text.heading01', 'text.heading02', 'text.heading03', 'text.heading04', 'text.heading05', 'text.heading06',
    'text.link', 'text.activeLink',
    'text.quotation', 'text.url',
    'markup', 'markup.heading', 'markup.quotation', 'markup.list', 'markup.link', 'markup.code',
    'code.inline', 'code.block', 'code.literal', 'code.comment'
]
const themeScopeHelp = {
  "text.heading01": "Level 1 headings, like \"# H1\"",
  "text.heading02": "Level 2 headings, like \"## H2\"",
  "text.heading03": "Level 3 headings, like \"### H3\"",
  "text.heading04": "Level 4 headings, like \"#### H4\"",
  "text.heading05": "Level 5 headings, like \"##### H5\"",
  "text.heading06": "Level 6 headings, like \"###### H6\"",
  "text.activeLink" : "Tap-clickable links",
  "text.link": "Markdown link text between brackets, like [text.link](...)",
  "text.url": "Markdown url text between parentheses, like [...](text.url)",
  "text.quotation" : "Quoted text, like `> quote`",
  "markup" : "General markup, for example the \"**\" asterisks around bold text",
  "markup.heading" : "Markup for headings, like the \"##\" prefixes to Markdown headings",
  "markup.quotation": "Markup for quotation, like \"> \" before Markdown quotes",
  "markup.list": "Markup for list lines, like \"*\" before Markdown list",
  "markup.link": "Brackets and braces in Markdown link, like [link](url)",
  "code.inline": "Inline code like `code`",
  "color.accent01": "Color used to accent text, commonly headings",
  "color.accent02": "Color used to accent text, commonly headings",
  "color.accent03": "Color used to accent text, commonly headings",
  "color.accent04": "Color used to accent text, commonly headings",
  "color.accent05": "Color used to accent text, commonly headings",
  "color.accent06": "Color used to accent text, commonly headings",
}


let loadFromDirectory = (iden) => {
    let url = `https://directory.getdrafts.com/api/v1/theme_definitions/current/${iden}`
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: 'json',
        success: function (data) {
            let source = data['source'];
            let t = JSON.parse(source);
            if (t) {
                theme = t;
                loadTheme();
            }
            else {
                alert("Error parsing requested theme data. Theme Builder has loaded default theme.");
            }
        },
        error: function(jqXHR, exception) {
            alert("Unable to load requested theme from the directory. Theme Builder has loaded default theme values.");
        }
    });
}

let theme = defaultTheme;
let initializeTheme = () => {
    let iden = getParam("identifier");
    if (iden) { // load data from directory
        loadFromDirectory(iden);
    }
    else {

    }    
}

let startLoading = () => {
  $('#page-cover').show();
}
let stopLoading = () => {
  $('#page-cover').hide();
}
let loadTheme = () => {
    startLoading();
    buildEditorColors();
    buildInterfaceColors();
    buildScopes();
    updatePreview();
    updateInstall();
    updateDownload();

    $('input.color-input').spectrum({
      preferredFormat: "hex",
      showPalette: false,
      type: "component",
      hideAfterPaletteSelect: true,
      showInput: true,
      showInitial: true,
      showAlpha: false,
      allowEmpty: false,
      change: function (color) {
        processChange();
      }
    });
    $('input.color-input-scope').spectrum({
      preferredFormat: "hex",
      showPalette: false,
      type: "component",
      hideAfterPaletteSelect: true,
      showInput: true,
      showAlpha: false,
      allowEmpty: false,
      change: function (color) {
        $(this).parent().prev().val('hex value');
        processChange();
      }
    });
    stopLoading();
}

let buildScopeField = (scopeName, scopeData) => {
    let html = [];
    let cleanedName = scopeName.replaceAll(".", "-");
    const hasHelp = themeScopeHelp[scopeName] ? true : false;
    html.push(`<section class="accordian">`);
    html.push(`<input type="checkbox" name="collapse" id="handle-scopes-${scopeName.replaceAll(".","-")}">
            <h2 class="handle">
                <label for="handle-scopes-${cleanedName}"${hasHelp ? " style='font-weight: bold;'" : ''}>${scopeName}</label>
            </h2>
            <div id="scopes-${cleanedName}-wrapper" class="content">`)
    html.push(`<div id="scope-${cleanedName}" class="field-scope">`);
    html.push(`<table>`);
    if (themeScopeHelp[scopeName]) {
        let tip = themeScopeHelp[scopeName];
        html.push(`<tr><td colspan='2'>${tip}</td></tr>`);
    }
    html.push(`<tr>
            <td colspan='2'>
              <div class='preview-sample'>
                <div class='preview-sample-${cleanedName}'>Sample Text: ${scopeName}</div>
              </div>
            </td>
          </tr>`);
    // fontSize
    html.push(`<tr>`)
    let fsz = "default";
    if (scopeData.settings.fontSize) {
        fsz = scopeData.settings.fontSize;
    }
    html.push(`<td><label for="scopes-${cleanedName}-fontSize" class='scope-label'>fontSize</label></td>`);
    html.push(`<td><select id="scopes-${cleanedName}-fontSize" data-font-size="${scopeName}" onchange="processChange();">
                <option${fsz == 'default' ? ' selected' : ''}>default</option>
                <option${fsz == 'extraSmall' ? ' selected' : ''}>extraSmall</option>
                <option${fsz == 'small' ? ' selected' : ''}>small</option>
                <option${fsz == 'normal' ? ' selected' : ''}>normal</option>
                <option${fsz == 'large' ? ' selected' : ''}>large</option>
                <option${fsz == 'extraLarge' ? ' selected' : ''}>extraLarge</option>
            </select></td>`);
    html.push(`</tr>`);
    // fontWeight
    html.push(`<tr>`)
    let fw = "default";
    if (scopeData.settings.fontWeight) {
        fw = scopeData.settings.fontWeight;
    }
    html.push(`<td><label for="scopes-${cleanedName}-fontWeight" class='scope-label'>fontWeight</label></td>`);
    html.push(`<td><select id="scopes-${cleanedName}-fontWeight" data-font-weight="${scopeName}" onchange="processChange();">
                <option${fw == 'default' ? ' selected' : ''}>default</option>
                <option${fw == 'ultraLight' ? ' selected' : ''}>ultraLight</option>
                <option${fw == 'thin' ? ' selected' : ''}>thin</option>
                <option${fw == 'light' ? ' selected' : ''}>light</option>
                <option${fw == 'regular' ? ' selected' : ''}>regular</option>
                <option${fw == 'medium' ? ' selected' : ''}>medium</option>
                <option${fw == 'semibold' ? ' selected' : ''}>semibold</option>
                <option${fw == 'bold' ? ' selected' : ''}>bold</option>
                <option${fw == 'heavy' ? ' selected' : ''}>heavy</option>
                <option${fw == 'black' ? ' selected' : ''}>black</option>
            </select></td>`);
    html.push(`</tr>`);
    // fontStyle
    let fs = [];
    if (scopeData.settings.fontStyle) {
        fs = scopeData.settings.fontStyle.split(",").map(t => t.trim());
    }
    html.push(`<tr>`)
    html.push(`<td><label for="" class='scope-label'>fontStyle</label></td>`);
    html.push(`<td data-font-style="${scopeName}"><input id="scopes-${cleanedName}-fontStyle-normal" data-font-style-normal="${scopeName}" type="checkbox" value="normal" onchange="processChange();"${fs.includes('normal') ? " checked='checked'" : ''}> normal&nbsp;
                <input id="scopes-${cleanedName}-fontStyle-italic" data-font-style-italic="${scopeName}" type="checkbox" value="italic" onchange="processChange();"${fs.includes('italic') ? " checked='checked'": ''}> italic&nbsp;
                <input id="scopes-${cleanedName}-fontStyle-underline" data-font-style-underline="${scopeName}" type="checkbox" value="underline" onchange="processChange();"${fs.includes('underline') ? " checked='checked'" : ''}> underline&nbsp;  
             `);
    html.push(`<input id="scopes-${cleanedName}-fontStyle-strikethrough" data-font-style-strikethrough="${scopeName}" type="checkbox" value="strikethrough" onchange="processChange();"${fs.includes('strikethrough') ? " checked='checked'" : ''}> strikethrough&nbsp;
                <input id="scopes-${cleanedName}-fontStyle-monospace" data-font-style-monospace="${scopeName}" type="checkbox" value="monospace" onchange="processChange();"${fs.includes('monospace') ? " checked='checked'" : ''}> monospace
                </td>`);
    html.push(`</tr>`);
    // foreground
    html.push(`<tr>`);
    let fg = "";
    if (scopeData.settings.foreground) {
        fg = scopeData.settings.foreground;
    }
    let fgResolved = fg;
    let fgHexResolved = "";
    if (!fgResolved.startsWith("#")) {
        if (theme.colors.editor[fgResolved]) {
            fgResolved = theme.colors.editor[fgResolved];
        }
    }
    else {
        fgHexResolved = fgResolved
    }
    html.push(`<td><label for="scopes-${cleanedName}-foreground" class='scope-label'>foreground</label></td>`);
    html.push(`<td style='white-space:nowrap;'><select id="scopes-${cleanedName}-foreground" data-foreground="${scopeName}" onchange="$(this).next().children().last().spectrum('set', theme.colors.editor[$(this).val()]);processChange();">`);
    html.push(`<option value="">inherit</option>`);
    html.push(`<option value="hex value">hex value</option>`);
    for (let color of namedColors) {
        html.push(`<option${color == fg ? " selected" : ""}>${color}</option>`);
    }
    html.push("</select>")
    html.push(`<input value="${fgResolved}" class="color-input-scope" /></td>`);
    html.push(`</tr>`);

    // background
    html.push(`<tr>`);
    let bg = "";
    if (scopeData.settings.background) {
        bg = scopeData.settings.background;
    }
    let bgResolved = bg;
    let bgHexResolved = "";
    if (!bgResolved.startsWith("#")) {
        if (theme.colors.editor[bgResolved]) {
            bgResolved = theme.colors.editor[bgResolved];
        }
    }
    else {
        ggHexResolved = bgResolved
    }
    html.push(`<td><label for="scopes-${cleanedName}-background" class='scope-label'>background</label></td>`);
    html.push(`<td style='white-space:nowrap;'><select id="scopes-${cleanedName}-background" data-background="${scopeName}" onchange="$(this).next().children().last().spectrum('set', theme.colors.editor[$(this).val()]);processChange();">`);
    html.push(`<option value="">inherit</option>`);
    html.push(`<option value="hex value">hex value</option>`);
    for (let color of namedColors) {
        html.push(`<option${color == bg ? " selected" : ""}>${color}</option>`);
    }
    html.push("</select>")
    html.push(`<input value="${bgResolved}" class="color-input-scope" />`);
    html.push(`</td></tr>`);

    html.push(`</table>`);
    html.push(`</div>`);
    html.push("</section>")
    return html.join("\n");
}

let buildColorField = (colorType, key, val) => {
    //avoid alpha values
    if (val.length > 7) { val = val.slice(0, 7); }
    return `<tr class="field-color">
            <td style='vertical-align:middle;'><label for="${colorType}-${key}-color">${key}</label></td>
            <td style='vertical-align:middle;'><input id="${colorType}-${key}-color" class="color-input" data-${colorType}-color='${key}' value="${val}"/></td>
        </tr>`;
}

let buildScopes = () => {
    let e = $("#scopes");
    let scopes = theme.scopes;
    let html = [];
    for (let scopeName in scopes) {
        html.push(buildScopeField(scopeName, scopes[scopeName]));
    }
    e.html(html);
}

let namedColors = [];
let buildEditorColors = () => {
    namedColors = [];
    let e = $("#editor-colors");
    let editorColors = theme.colors.editor;
    let html = ['<table>'];
    for(let key in editorColors) {
        namedColors.push(key);
        html.push(buildColorField("editor", key, editorColors[key]));
    }
    html.push('</table>');
    e.html(html);
}

let buildInterfaceColors = () => {
    let e = $("#interface-colors");
    let interfaceColors = theme.colors.interface;
    let html = ["<table>"];
    for (let key in interfaceColors) {
        html.push(buildColorField("interface", key, interfaceColors[key]));
    }
    html.push('</table>');
    e.html(html);
}

let formToTheme = () => {
    // identification
    theme.name = $("#theme-name").val();
    theme.author = $("#theme-author").val();
    theme.description = $("#theme-description").val();

    // interface colors
    $('input[data-interface-color]').each(function() {
        let key = $(this).data('interface-color');
        theme.colors.interface[key] = $(this).val();
    });
    // editor colors
    $('input[data-editor-color]').each(function () {
        let key = $(this).data('editor-color');
        theme.colors.editor[key] = $(this).val();
    });
    // fontSize
    $('select[data-font-size]').each(function() {
        let val = $(this).val();
        let scopeName = $(this).data("font-size");
        if (val == 'default') {
            if (theme.scopes[scopeName].settings.fontSize) {
                delete theme.scopes[scopeName].settings.fontSize
            }
        }
        else {
            theme.scopes[scopeName].settings.fontSize = val;
        }
    });
    // fontWeight
    $('select[data-font-weight]').each(function () {
        let val = $(this).val();
        let scopeName = $(this).data("font-weight");
        if (val == 'default') {
            if (theme.scopes[scopeName].settings.fontWeight) {
                delete theme.scopes[scopeName].settings.fontWeight
            }
        }
        else {
            theme.scopes[scopeName].settings.fontWeight = val;
        }
    });
    // fontStyle
    $('td[data-font-style]').each(function () {
        let vals = [];
        $(this).children(':checked').each(function() {
            vals.push($(this).val());
        });
        let scopeName = $(this).data("font-style");

        if (vals.length > 0) {
            theme.scopes[scopeName].settings.fontStyle = vals.join(", ");
        }
        else {
            if (theme.scopes[scopeName].settings.fontStyle) {
                delete theme.scopes[scopeName].settings.fontStyle
            }
        }
    });
    // foreground
    $('select[data-foreground]').each(function () {
        let val = $(this).val();
        let scopeName = $(this).data("foreground");
        if (val == '') { // inherit
            if (theme.scopes[scopeName].settings.foreground) {
                delete theme.scopes[scopeName].settings.foreground
            }
        }
        else {
            if (val == 'hex value') { // override
                let hexVal = $(this).next().children().last().val();
                if (hexVal.length > 0) {
                    theme.scopes[scopeName].settings.foreground = hexVal;
                }
                else {
                    if (theme.scopes[scopeName].settings.foreground) {
                        delete theme.scopes[scopeName].settings.foreground
                    }
                }
            }
            else { // named value
                theme.scopes[scopeName].settings.foreground = val;
            }
        }
    });
    // background
    $('select[data-background]').each(function () {
        let val = $(this).val();
        let scopeName = $(this).data("background");
        if (val == '') { // inherit
            if (theme.scopes[scopeName].settings.background) {
                delete theme.scopes[scopeName].settings.background
            }
        }
        else {
            if (val == 'hex value') { // override
                let hexVal = $(this).next().children().last().val();
                if (hexVal.length > 0) {
                    theme.scopes[scopeName].settings.background = hexVal;
                }
                else {
                    if (theme.scopes[scopeName].settings.background) {
                        delete theme.scopes[scopeName].settings.background
                    }
                }
            }
            else { // named value
                theme.scopes[scopeName].settings.background = val;
            }
        }
    });
}

let emForFontSize = (fontSize) => {
    switch(fontSize) {
        case "extraSmall": return ".6em";
        case "small": return ".8em";
        case "normal": return "1em";
        case "large": return "1.2em";
        case "extraLarge": return "1.4em";
        default: return "1em";
    }
}

let weightForFontWeight = (fontWeight) => {
    switch (fontWeight) {
        case "ultraLight": return "100";
        case "thin": return "200";
        case "light": return "300";
        case "regular": return "400";
        case "medium": return "500";
        case "semibold": return "600";
        case "bold": return "700";
        case "heavy": return "800";
        case "black": return "900";
        default: return "500";
    }
}

let updatePreview = () => {
    $("#view-source").html(JSON.stringify(theme, null, 4));
    $("#theme-name").val(theme.name);
    $("#theme-author").val(theme.author);
    $("#theme-description").val(theme.description);

    let e = $("#preview-content");
    for (let c in theme.colors.editor) {
        $(`.preview-editor-background-${c}`).css('background-color', theme.colors.editor[c]);
    }
    for (let c in theme.colors.interface) {
        $(`.preview-interface-background-${c}`).css('background-color', theme.colors.interface[c]);
    }
    for (let c in theme.colors.editor) {
        $(`.preview-editor-foreground-${c}`).css('color', theme.colors.editor[c]);
    }
    for (let c in theme.colors.interface) {
        $(`.preview-interface-foreground-${c}`).css('color', theme.colors.interface[c]);
    }
    if (theme.colors.editor['foreground']) {
      $('.preview-sample').css('color', theme.colors.interface['foreground']);
    }
    if (theme.colors.interface['textBackground']) {
        $('.preview-sample').css('background-color', theme.colors.interface['textBackground']);
    }
    let scopes = theme.scopes;
    for (let scopeName in scopes) {
        let cleanedName = scopeName.replaceAll(".", "-");
        let settings = theme.scopes[scopeName].settings;
        let styles = {};
        if (settings['foreground']) {
            let val = settings['foreground'];
            if (!val.startsWith("#") && theme.colors.editor[val]) {
                val = theme.colors.editor[val]
            }
            styles['color'] = val;
        }
        else {
            styles['color'] = 'inherit'
        }
        if (settings['background']) {
            let val = settings['background'];
            if (!val.startsWith("#") && theme.colors.editor[val]) {
                val = theme.colors.editor[val]
            }
            styles['background-color'] = val;
        }
        else {
            styles['background-color'] = 'inherit'
        }
        if (settings["fontSize"]) {
            styles['font-size'] = emForFontSize(settings["fontSize"])
        }
        else {
            styles['font-size'] = emForFontSize('normal')
        }
        if (settings["fontWeight"]) {
            styles['font-weight'] = weightForFontWeight(settings["fontWeight"]);
        }
        else {
            styles['font-weight'] = weightForFontWeight('regular');
        }
        if (settings["fontStyle"]) {
            let vals = settings["fontStyle"].split(",").map(t => t.trim());
            if (vals.includes('italic')) {
                styles['font-style'] = 'italic';
            }
            else {
                styles['font-style'] = 'normal';
            }
            let deco = [];
            if (vals.includes("strikethrough")) {
                deco.push("line-through");
            }
            if (vals.includes("underline")) {
                deco.push("underline");
            }
            if (deco.length == 0) {
                styles['text-decoration'] = 'none';
            }
            else {
                styles['text-decoration'] = deco.join(" ");
            }
            if (vals.includes("monospace")) {
                styles['font-family'] = monoFamily;
            }
            else {
                styles['font-family'] = '';
            }
        }
        else { // no style
            styles['font-style'] = 'normal';
            styles['text-decoration'] = 'none';
            styles['font-family'] = '';
        }
        $(`#preview-${cleanedName}`).css(styles);
        $(`.preview-${cleanedName}`).css(styles);
        $(`.preview-sample-${cleanedName}`).css(styles);
    }
}

let updateInstall = () => {
    $("#install-button").attr("href", `x-drafts://importtheme?data=${encodeURIComponent(JSON.stringify(theme))}`);
}

let downloadUrl = null;
let updateDownload = () => {
    let blob = new Blob(
        [JSON.stringify(theme)],
        {
            type: "text/json:charset=utf-8"
        }
    )
    if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
    }
    downloadUrl = URL.createObjectURL(blob);
    $("#download-button").attr('href', downloadUrl);
    $("#download-button").attr('download', `${theme.name}.draftsTheme`)
}

let uploadThemeFile = () => {
    let file = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        let text = e.target.result;
        if (!text) {
            alert("Unable to load theme file.");
        }
        else {
            let json = JSON.parse(text);
            if (!json) {
                alert("Unable to load theme file.");
            }
            else {
                theme = json;
                loadTheme();
            }
        }
    });
    reader.readAsText(file);
}

let processChange = () => {
    formToTheme();
    updatePreview();
    updateInstall();
    updateDownload();
}

// END Themes
