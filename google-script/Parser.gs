
function test() {
  let url = "https://statusinvest.com.br/acoes/brdt3";
  //let pattern = "/(<h3)(.*)(Valor de mercado)(<\/h3>)(\n|\r)(<b)(.*)(\n|\r)(<strong class='value')(.*)(<\/strong>)";
  //let pattern = "<h3 class=\"title m-0\">Dívida líquida<\/h3>";
  //let pattern = "(<h3)(.*)(Valor de mercado)(<\/h3>)(\n|\r)(<b)(.*)(<\/b>)(\n|\r)[^(\/b>)]*(<strong[^>]*>)(.*?)(<\/strong>)";
  //let pattern = "(<h3.*Valor de mercado<\/h3>)(\n|\r)(<b.*<\/b>)(\n|\r)(<strong[^>]*>)(.*?)(<\/strong>)";
  //let pattern = "(<h3.*Ativo circulante<\/h3>)(\n|\r)(<div>)(\n|\r)(<b.*<\/b>)(\n|\r)(<strong[^>]*>)(.*?)(<\/strong>)";
  //let pattern = "(<div class=\"info pl-md-2 pr-md-2\">)(\n|\r)(<div>)(\n|\r)(<div>)(\n|\r)(<span.*<\/span>)(\n|\r)(<div>)(\n|\r)(<a.*>)(\n|\r)(<strong[^>]*>)(.*?)(<\/strong>)";
  //let pattern = "(<div title=\"Tipo do ativo\">)(\n|\r)((<h3.*h3>)(\n|\r)(<strong[^>]*>)(.*?)(<\/strong>)|((<h3)(.*)(<strong[^>]*>)(.*?)(<\/strong>)))";
  let pattern = "(<h3.*Ativos<\/h3>)(\n|\r)(<b.*<\/b>)(\n|\r)(<strong[^>]*>)(.*?)(<\/strong>)";
  let index = 7;
  let html = '';
  let response = UrlFetchApp.fetch(url);
  if (response) {
    html = response.getContentText();
    let regex = new RegExp( pattern, "igm" );
    let vetregex = regex.exec(html);
    let content = vetregex[index];
    Logger.log(html);
    Logger.log(content);
  }  
}

function importByRegex(url, regex_string, index) {
  var html, content = '';
  var response = UrlFetchApp.fetch(url);
  if (response) {
    html = response.getContentText();
    if (html.length && regex_string.length) {
       let regex = new RegExp(regex_string, "g");
       let vetregex = regex.exec(html);
       if (vetregex && vetregex.length >= index) 
         content = vetregex[index];
       else
         content = null;
    }
  }
  content = unescapeHTML(content);
  Utilities.sleep(2000); // avoid call limit by adding a delay
  return content;  
}


function importRegex(url, regex_string) {
  var html, content = '';
  var response = UrlFetchApp.fetch(url);
  if (response) {
    html = response.getContentText();
    if (html.length && regex_string.length) {
      var regex = new RegExp( regex_string, "i" );
      content = html.match(regex)[1];
    }
  }
  content = unescapeHTML(content);
  Utilities.sleep(1000); // avoid call limit by adding a delay
  return content;  
}

var htmlEntities = {
  nbsp:  ' ',
  cent:  '¢',
  pound: '£',
  yen:   '¥',
  euro:  '€',
  copy:  '©',
  reg:   '®',
  lt:    '<',
  gt:    '>',
  mdash: '–',
  ndash: '-',
  quot:  '"',
  amp:   '&',
  apos:  '\''
};

function unescapeHTML(str) {
  let result = str;
  try {
    result = str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
  }
  catch(err) {
    result = "Try again..."
  }
  
  return result;
};