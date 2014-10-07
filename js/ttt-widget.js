/*global TTT */
(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var Widget = TTT.Widget = function (game, $el) {
    this.game = game;
    this.el = $el;
    this.currentPlayer = "p1";
  };

  var clickCallback = function(event) {
    var currentTarget = event.currentTarget;
    var $currentTarget = $(currentTarget);
    this.makeMove($currentTarget);
  };
  
  Widget.prototype.bindEvents = function () {
    var $squares = $(".square");
    
    $squares.click(clickCallback.bind(this));
  };

  Widget.prototype.makeMove = function ($square) {
    var pos = [$square.data("row"), $square.data("col")];
    this.game.playMove(pos);
    $square.removeClass("unclicked").addClass(this.currentPlayer);
    
    if (this.game.isOver()) {
      var $end = $("<div></div>");
      if (this.game.winner()) {
        if (this.currentPlayer === "p1") {
          $end.text("BLUE WON");
          $end.addClass("p1");
        } else {
          $end.text("RED WON");
          $end.addClass("p2");
        }
      } else {
        $end.text("TIE GAME");
      }
      this.el.append($end);
      var $squares = $(".square");
      $squares.each(function (i, square) {
        $(square).off("click");
      });
    } else {
      this.currentPlayer = this.currentPlayer === "p1" ? "p2" : "p1";
    }
  };

  Widget.prototype.play = function () {
    this.setupBoard();
    this.bindEvents();
  };

  Widget.prototype.setupBoard = function () {
    for (var i = 0; i < 3; i++) {
      var $row = $("<div>");
      $row.addClass("row");
      
      for (var j = 0; j < 3; j++) {
        var $square = $("<div>");
        $square.addClass("square").addClass("unclicked");
        $square.data("row", i);
        $square.data("col", j);
        $row.append($square);
      }
      this.el.append($row);
    }
  };
})();
