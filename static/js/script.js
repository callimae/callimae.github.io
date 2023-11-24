document.addEventListener("scroll", function () {
  var totalHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrollPosition = window.scrollY;
  var progressWidth = (scrollPosition / totalHeight) * 100;
  document.getElementById("progress-bar").style.width = progressWidth + "%";
});

$(document).ready(function () {
  $("pre code").each(function () {
    var button =
      '<i class="material-icons copy-icon" title="Kopiuj">content_copy</i>';
    var notification = '<span class="copied-notification">Copied!</span>';
    $(this)
      .parent()
      .prepend(button + notification);
  });
});

$(document).on("click", ".copy-icon", function () {
  var code = $(this).siblings("code").text();
  var temp = $("<textarea>");
  $("body").append(temp);
  temp.val(code).select();
  document.execCommand("copy");
  temp.remove();

  var notification = $(this).siblings(".copied-notification");
  notification.css("visibility", "visible").css("opacity", "1");
  setTimeout(function () {
    notification.css("visibility", "hidden").css("opacity", "0");
  }, 1000); // okienko "copied!" zniknie po 1 sekundzie
});

tocbot.init({
  // Where to render the table of contents.
  tocSelector: ".toc-sidebar", // zmieniono selektor z '.js-toc' na '.toc-sidebar'
  // Where to grab the headings to build the table of contents.
  contentSelector: ".js-toc-content",
  // Which headings to grab inside of the contentSelector element.
  headingSelector: "h1, h2, h3, h4",
  // For headings inside relative or absolute positioned containers within content.
  hasInnerContainers: true,
});
