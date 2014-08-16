angular.module("utils", [])
  .factory("utils", function() {
    return {

      buildQueryString: function (parameters) {
        var qs = "";
        for (var key in parameters) {
          var value = parameters[key];
          qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
        }
        if (qs.length > 0){
          qs = qs.substring(0, qs.length-1);  // Chop off last "&"
        }
        return qs;
      }

    };
  });
