// Prevent hanging prepositions/conjunctions in headings
// Replaces spaces after one-letter Russian words with non-breaking spaces
(function(){
  function protectTextNode(node){
    // short Russian prepositions/conjunctions (1–2 letters)
    // в, к, с, у, о, а, и, из, на, по, во, от, до, за
    const re = new RegExp('(\\b)(?:' + [
      'В','в','К','к','С','с','У','у','О','о','А','а','И','и',
      'Из','из','На','на','По','по','Во','во','От','от','До','до','За','за'
    ].join('|') + ')(\s+)', 'g');
    const val = node.nodeValue;
    const next = val.replace(re, function(match, b1){
      // Replace trailing spaces after the matched short word with NBSP
      return match.replace(/\s+$/, '\u00A0');
    });
    if(next !== val) node.nodeValue = next;
  }
  function process(el){
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        const p = n.parentNode && n.parentNode.nodeName;
        if(p === 'SCRIPT' || p === 'STYLE') return NodeFilter.FILTER_REJECT;
        if(!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let node;
    while((node = walker.nextNode())) protectTextNode(node);
  }
  function init(){
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
    headings.forEach(process);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
