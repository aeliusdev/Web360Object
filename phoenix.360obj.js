/* Request Animation Frame Fallback */

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/**
 * Object CSS3D - Converts an object into a CSS 3d object that moves in response to mouse movement.
 *
 * @class obj3d
 * @author George Baker
 * @namespace obj3d
 */
var obj3d = obj3d || function (id) 
{
	
	this.version = "1.0.0";
	this.author = "George Baker";
	this.object = id;
	this.settings = 
	{
		windowWidth: window.innerWidth,
		windowHeight: window.innerHeight,
		offsetX: 0,
		offsetY: 0,
		max_angleX: 25,
		max_angleY: 10
	}
		
	obj3d.prototype.init = function () 
	{
	
		this.animate();	
		
	}
	
	obj3d.prototype.update_settings = function () 
	{
		
		var that = this;

		that.settings.windowWidth = window.innerWidth;		
		that.settings.windowHeight = window.innerHeight;
		
		jQuery("html").mousemove(function (e) 
		{
			
			var angleX = (e.pageX / (that.settings.windowWidth / 2)) * that.settings.max_angleX;
			var angleY = (e.pageY / (that.settings.windowHeight / 2)) * that.settings.max_angleY;
			var directionX = (that.settings.windowWidth / 2 <= e.pageX) ? "right" : "left";
			var directionY = (that.settings.windowHeight / 2 <= e.pageY) ? "down" : "up";
			
			if (directionX == "left") 
			{
				that.settings.offsetX = -(that.settings.max_angleX - angleX);
			} else 
			{
				that.settings.offsetX = angleX - that.settings.max_angleX;				
			}

			if (directionY == "up") 
			{
				that.settings.offsetY = -(that.settings.max_angleY - angleY);
			} else 
			{
				that.settings.offsetY = angleY - that.settings.max_angleY;				
			}
																			
		});		
		
	}
	
	obj3d.prototype.animate = function () 
	{

		var that = this;
		
		this.update_settings();

		this.object.css({transform: "rotateX(" + that.settings.offsetY + "deg) rotateY(" + that.settings.offsetX + "deg) rotateZ(0deg)"});
				
		window.requestAnimationFrame(function() 
		{ 
			that.animate(); 
		});
		
	}	
		
	this.init();	
	
}

