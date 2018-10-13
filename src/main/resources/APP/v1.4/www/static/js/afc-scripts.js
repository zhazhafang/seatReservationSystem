$(function(){
	$.fn.nadhiro_lab = {
		config : {
			ajax_url : '',
		},
		
		init : function(){
			this.hundlers();
			this.adjust();
			this.ui.init();
		},
		
		hundlers : function(){},
		adjust : function(){},
		actions : {
			generate_id : function(){
				var text = "";
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
				for( var i=0; i < 10; i++ ){
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}
				return text;
			}
		},
		
		ui : {
			mousedDownFired : false,
			
			init : function(){
				this.hundlers();
				this.adjust();
			},
			
			hundlers : function(){
				//DropDownList:
				$('body').on('click', '.afc-dropdownlist-container', function(e){
					e.stopPropagation();
					if(!$(this).is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.dropdownlist.clicked($(this));
					}
				});
				
				$('body').on('mouseup', '.afc-dropdownlist-container .list-label', function(e){
					e.stopPropagation();
					if(!$(this).parents('.afc-dropdownlist-container').is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.dropdownlist.label_clicked($(this));
					}
				});
				
				$('html').on('click', function(){
					$('.afc-dropdownlist-container .list-container').slideUp(1000,"easeOutBounce");
					$('.afc-dropdownlist-container .list-container .list-finder .total-results').html('');
					$('.afc-url-container .protocols-list ul').slideUp(1000,"easeOutBounce");
				});
				
				$("body").on('click', '.afc-dropdownlist-container .list-container .list-finder', function(e){
					e.stopPropagation();
				});
				
				$('body').on('keyup', '.afc-dropdownlist-container .list-container .list-finder .input-zone', function(e){
					$.fn.nadhiro_lab.ui.actions.form.dropdownlist.finder($(this));
				});
				
				$('body').on('mouseup', '.afc-dropdownlist-container .list-container ul li.option', function(){
					$.fn.nadhiro_lab.ui.actions.form.dropdownlist.option_clicked($(this));
				});
				
				$('body').on('click', '.afc-dropdownlist-container .list-container ul li.option_group', function(e){
					e.stopPropagation();
				});
				
				//Url:
				$('body').on('click', '.afc-url-container .protocols-list .protocols-label', function(e){
					e.stopPropagation();
					if(!$(this).parents('.afc-url-container').is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.url.label_clicked($(this));
					}
				});
				
				$('body').on('mouseup', '.afc-url-container .protocols-list ul li.protocol', function(){
					$.fn.nadhiro_lab.ui.actions.form.url.option_clicked($(this));
				});
				
				$('body').on('keyup', '.afc-url-container .url-input-zone .input-zone', function(e){
					$.fn.nadhiro_lab.ui.actions.form.url.keyup($(this));
				});
				
				$('body').on('change', '.afc-url-container .url-input-zone .input-zone', function(e){
					$.fn.nadhiro_lab.ui.actions.form.url.setValue($(this));
				});
				
				//CheckBox
				$('body').on('click', '.afc-checkbox-container', function(e){
					e.stopPropagation();
					if(!$(this).is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.checkbox.clicked($(this));
					}
				});
				
				$('input[type=checkbox]').on('change', function(){
					$.fn.nadhiro_lab.ui.actions.form.checkbox.changed($(this));
				});
				
				$('input[type=checkbox]').on('reset', function(){
					$.fn.nadhiro_lab.ui.actions.form.checkbox.changed($(this));
				});
				
				//Radio
				$('body').on('click', '.afc-radio-container', function(e){
					e.stopPropagation();
					if(!$(this).is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.radio.clicked($(this));
					}
				});
				
				$('input[type=radio]').on('change', function(){
					$.fn.nadhiro_lab.ui.actions.form.radio.changed($(this));
				});
				
				//Effects
				$("body").on("mousedown", '.clickable', function(e){
					$.fn.nadhiro_lab.ui.actions.clickable($(this), e);
				});
				
				$("body").on("reset", 'form', function(){
					$.fn.nadhiro_lab.ui.actions.form.reset($(this));
				});
				
				
				$('input[type=file]').on('change', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.file.changed($(this));
				});
				
				//Number
				$('body').on('change', '.afc-number-container .number-label input.input-zone', function(e){
					var value = $(this).val().replace(/[^0-9$.]/g, '').replace( /^([^.]*\.)(.*)$/, function (a, b, c) { 
						return b + c.replace( /\./g, '' );
					});
					$(this).val(value);
					$.fn.nadhiro_lab.ui.actions.form.number.setValue($(this), value);
				});
				
				$('body').on('keyup', '.afc-number-container .number-label input.input-zone', function(e){
					var value = $(this).val().replace(/[^0-9$.]/g, '').replace( /^([^.]*\.)(.*)$/, function (a, b, c) { 
						return b + c.replace( /\./g, '' );
					});
					$(this).val(value);
					$.fn.nadhiro_lab.ui.actions.form.number.setValue($(this), value);
				});
				
				$('body').on('keydown', '.afc-number-container .number-label input.input-zone', function(e){
					var value = $(this).val().replace(/[^0-9$.]/g, '').replace( /^([^.]*\.)(.*)$/, function (a, b, c) { 
						return b + c.replace( /\./g, '' );
					});
					$(this).val(value);
					$.fn.nadhiro_lab.ui.actions.form.number.setValue($(this), value);
				});
				
				$('body').on('mouseup', '.afc-number-container .number-btns .plus-btn', function(e){
					if(!$(this).parents('.afc-number-container').is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.number.clicked($(this), 'plus');
					};
				});
				
				$('body').on('mouseup', '.afc-number-container .number-btns .minus-btn', function(e){
					if(!$(this).parents('.afc-number-container').is('.disabled')){
						$.fn.nadhiro_lab.ui.actions.form.number.clicked($(this), 'minus');
					}
				});
				
				$('input[type=file]').on('change', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.number.changed($(this));
				});
				
				//Text input
				$('body').on('focus', '.afc-text-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.text.focus($(this));
				});
				
				$('body').on('blur', '.afc-text-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.text.blur($(this));
				});
				
				$('body').on('keyup', '.afc-text-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.text.keyup($(this));
				});
				
				$('input[type=text]').not('.input-zone').on('change', function(){
					$.fn.nadhiro_lab.ui.actions.form.text.changed($(this));
				});
				
				//Password input
				$('body').on('focus', '.afc-password-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.password.focus($(this));
				});
				
				$('body').on('blur', '.afc-password-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.password.blur($(this));
				});
				
				$('body').on('keyup', '.afc-password-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.password.keyup($(this));
				});
				
				$('input[type=password]').on('change', function(){
					$.fn.nadhiro_lab.ui.actions.form.password.changed($(this));
				});
				
				//Search input
				$('body').on('focus', '.afc-search-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.search.focus($(this));
				});
				
				$('body').on('blur', '.afc-search-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.search.blur($(this));
				});
				
				$('body').on('keyup', '.afc-search-container .input-zone', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.search.keyup($(this));
				});
				
				$('body').on('click', '.afc-search-container .empty-btn', function(e){
					e.stopPropagation();
					$.fn.nadhiro_lab.ui.actions.form.search.empty($(this));
				});
			},
			
			adjust : function(){
				$('select').not('.afc-dropdownlist-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.dropdownlist.customise($(this));
				});
				
				$('input[type=checkbox]').not('.afc-checkbox-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.checkbox.customise($(this));
				});
				
				$('input[type=radio]').not('.afc-radio-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.radio.customise($(this));
				});
				
				$('input[type=button], input[type=reset], input[type=submit], :button').not('.afc-btn').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.btn.customise($(this));
				});
				
				$('input[type=file]').not('.afc-file-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.file.customise($(this));
				});
				
				$('input[type=number]').not('.afc-number-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.number.customise($(this));
				});
				
				$('input[type=text]').not('.afc-text-input').not('.input-zone').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.text.customise($(this));
				});
				
				$('input[type=password]').not('.afc-password-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.password.customise($(this));
				});
				
				$('input[type=url]').not('.afc-url-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.url.customise($(this));
				});
				
				$('input[type=search]').not('.afc-search-input').each(function(){
					$.fn.nadhiro_lab.ui.actions.form.search.customise($(this));
				});
			},
			
			actions : {
				clickable : function(element, event){
					options = new Object();
					options.from = new Object();
					options.to = new Object();
					options.from.diametre	= 0;
					options.from.left		= (event.pageX - element.offset().left);
					options.from.top		= (event.pageY - element.offset().top);
					options.to.diametre		= (event.pageX - element.offset().left)>(element.outerWidth()/2) ? (event.pageX - element.offset().left)*2 : (element.outerWidth() - (event.pageX - element.offset().left))*2;
					options.to.left			= (event.pageX - element.offset().left)-(options.to.diametre/2);
					options.to.top			= (event.pageY - element.offset().top)-(options.to.diametre/2);
					
					
					if(!$('.afc-effects-container', element).length){
						$("<div>", {
							class : 'afc-effects-container'
						}).appendTo(element);
					}
					
					$("<div>", {
						class : 'afc-propagation-effect'
					}).css({"width" : options.from.diametre, "height" : options.from.diametre, "left":options.from.left, "top":options.from.top, "opacity" : ".2"}).appendTo($('.afc-effects-container', element))
					.animate({"width" : options.to.diametre, "height" : options.to.diametre, "left":options.to.left, "top":options.to.top, "opacity" : "0"}, {duration:550}).animate({"opacity" : "0"}, {duration:750, complete:function(){
						$(this).remove();
					}});
				},
				
				form : {
					reset : function($form){
						setTimeout(function(){
							$('select.afc-dropdownlist-input').each(function(){
								$.fn.nadhiro_lab.ui.actions.form.dropdownlist.changed($(this));
							});
							
							$('input[type=checkbox].afc-checkbox-input').each(function(){
								$.fn.nadhiro_lab.ui.actions.form.checkbox.changed($(this));
							});
							
							$('input[type=radio].afc-radio-input').each(function(){
								$.fn.nadhiro_lab.ui.actions.form.radio.changed($(this));
							});
						}, 100);
						
					},
					
					dropdownlist : {
						customise : function($ddl_input){
							if($ddl_input.is(".do_not_costumise")){return;}
							
							if($ddl_input.not('.afc-dropdownlist-input')){
								var new_id				= $.fn.nadhiro_lab.actions.generate_id();
								var ddli_value			= $ddl_input.val();
								var ddli_optionsCount	= $("option", $ddl_input).length;
								var ddl_label			= ddli_optionsCount > 0 ? $("option[value="+ddli_value+"]", $ddl_input).html() : "Select...";
								var ddl_class			= $ddl_input.attr("class") != null ? $ddl_input.attr("class") : '';
								var new_ddl_class		= "afc-dropdownlist-container "+ddl_class+" ";
								
								
								$ddl_input.addClass("afc-dropdownlist-input");
								$ddl_input.attr('_customid', new_id);
								
								if($ddl_input.is('.finder')){new_ddl_class +=" finder";}
								if($ddl_input.is(":disabled")){new_ddl_class += " disabled";}
								if($ddl_input.is(".fullwidth")){new_ddl_class += " fullwidth";}
								
								var ddl_html = '';
								ddl_html += '<div class="'+new_ddl_class+'" _customid="'+new_id+'">';
								ddl_html += 	'<div class="list-label">';
								ddl_html += 		'<div class="text">'+ddl_label+'</div>';
								ddl_html += 		'<div class="right-btn clickable"></div>';
								ddl_html += 	'</div>';
								ddl_html += 	'<div class="list-container">';
								
								if($ddl_input.is('.finder')){
									ddl_html += 	'<label for="list-finder-input-model-device" class="list-finder clickable">';
									ddl_html += 		'<div class="color-indicator"></div>';
									ddl_html += 		'<div class="total-results"></div>';
									ddl_html += 		'<div class="placeholder">write something..</div>';
									ddl_html += 		'<input type="text" class="input-zone" id="list-finder-input-model-device" autocomplete="off">';
									ddl_html += 	'</label>';
								}
								
								ddl_html += 		'<ul class="list-content">';
								
								$(">optgroup, >option", $ddl_input).each(function(){
									if($(this).is('option')){
										if($(this).is(':selected')){
											ddl_html += '<li class="option clickable selected" value="'+$(this).val()+'"><div class="text">'+$(this).html()+'</div></li>';
										}else{
											ddl_html += '<li class="option clickable" value="'+$(this).val()+'"><div class="text">'+$(this).html()+'</div></li>';
										}
									}else if($(this).is('optgroup')){
										var $optgroup_label	= $(this).attr('label') != null ? $(this).attr('label') : '';
										ddl_html += '<li class="option_group" value="'+$optgroup_label+'"><div class="text">'+$optgroup_label+'</div></li>';
										$("option", $(this)).each(function(){
											if($(this).is(':selected')){
												ddl_html += '<li class="option clickable selected" value="'+$(this).val()+'"><div class="text">'+$(this).html()+'</div></li>';
											}else{
												ddl_html += '<li class="option clickable" value="'+$(this).val()+'"><div class="text">'+$(this).html()+'</div></li>';
											}
										});
									}
								});
								
								ddl_html += '		</ul>';
								ddl_html += '	</div>';
								ddl_html += '</div>';
								
								$ddl_input.after(ddl_html);
							}
						},
						
						clicked : function($ddl){
							$('.afc-dropdownlist-container').not($ddl).find('.list-container').slideUp(1000,"easeOutBounce");
						},
						
						changed : function($ddl_input){
							var value		= $ddl_input.val();
							var _customid	= $ddl_input.attr('_customid');
							$ddl			= $(".afc-dropdownlist-container[_customid="+_customid+"]");
							
							if($ddl.length){
								$(".list-container ul.list-content li.option", $ddl).removeClass("selected");
								$(".list-container ul.list-content li.option[value="+value+"]", $ddl).click();
							}					
						},
						
						label_clicked : function($ddl_label){
							$ddl		= $ddl_label.parents('.afc-dropdownlist-container');
							$('.afc-dropdownlist-container').not($ddl).find('.list-container').slideUp(1000,"easeOutBounce");
							
							var ddl_height	= $(".list-container", $ddl).height() + 10;
							var ddl_top = $ddl.offset().top - $(window).scrollTop();
							if($('.list-container', $ddl).is(':visible')){
								$('.list-container', $ddl).slideUp(1000,"easeOutBounce");
							}else{
								$('.afc-dropdownlist-container').not($ddl).css({"z-index":"0"});
								$ddl.css({"z-index":"1"});
								if(ddl_top > ddl_height){
									$ddl.removeClass('downside');
								}else{
									$ddl.addClass('downside');
								}
								$('.list-container', $ddl).hide(100);
								$('.list-container ul.list-content li.option .text', $ddl).addClass("hidden");
								$('.list-container', $ddl).slideDown(100, function(){
									$('.list-container ul.list-content li.option .text', $ddl).removeClass("hidden");
								});
							}
						},
						
						option_clicked : function($ddl_option){
							$ddl = $ddl_option.parents('.afc-dropdownlist-container');
							var value = $ddl_option.attr('value') != null ? $ddl_option.attr('value') : '';
							var label = $(".text", $ddl_option).length ? $(".text", $ddl_option).html() : $ddl_option.html();
							var _customid = $ddl.attr('_customid');
							
							$('.list-container', $ddl).slideUp(1000,"easeOutBounce");
							$('.list-container ul li.option', $ddl).not($ddl_option).removeClass('selected');
							$ddl_option.addClass('selected');
							
							$.fn.nadhiro_lab.ui.actions.form.dropdownlist.set_input_select(_customid, value);
							$.fn.nadhiro_lab.ui.actions.form.dropdownlist.set_label($ddl, label);
						},
						
						set_label : function($ddl, text){
							$('.list-label .text', $ddl).html(text);
						},
						
						set_input_select : function(_customid, value){
							$ddl_input_select = $('select[_customid='+_customid+']');
							$('option[value="'+value+'"]', $ddl_input_select).prop('selected', true);
						},
						
						finder : function($list_finder_input){
							$ddl = $list_finder_input.parents('.afc-dropdownlist-container');
							var finder_input_text = $list_finder_input.val().toLowerCase();
							var total_results = 0;
							var current_result = $('.list-container ul li:visible', $ddl).length;
							if(finder_input_text == ''){
								$('.list-container .list-finder .placeholder', $ddl).fadeIn(300);
								$('.list-container .list-finder .total-results', $ddl).addClass('hidden');
							}else{
								$('.list-container .list-finder .placeholder', $ddl).fadeOut(50);
							}
							$('.list-container ul li', $ddl).each(function(){
								//var rech_reg = new RegExp("^"+finder_input_text,"gi");
								var rech_reg = new RegExp(finder_input_text,"gi");
								if(rech_reg.test($(this).text())){
									$(this).show();
									total_results++;
								}else{
									$(this).hide();
								}
							});
							if(total_results != current_result){
								$('.list-container .list-finder .total-results', $ddl).addClass('hidden');
							}
							
							if(total_results != current_result){
								setTimeout(function(){
									$('.list-container .list-finder .total-results', $ddl).html(total_results);
									$('.list-container .list-finder .total-results', $ddl).removeClass('hidden');
								}, 300);
							}else{
								$('.list-container .list-finder .total-results', $ddl).html(total_results);
							}
						},
					},
					
					checkbox : {
						clicked : function($cb){
							if($cb.is(".disabled")){return;}
							var _customid = $cb.attr("_customid");
							$cb_input = $("input[type=checkbox][_customid="+_customid+"]");
							if($cb_input.length){
								$cb_input.prop('checked', ($cb_input.is(":checked") ? false : true));
								$cb_input.is(":checked") ? $cb.addClass("checked") : $cb.removeClass("checked");
							}
						},
						
						changed : function($cb_input){
							var _customid = $cb_input.attr("_customid");
							$cb = $(".afc-checkbox-container[_customid="+_customid+"]");
							if($cb.length){
								$cb_input.is(":checked") ? $cb.addClass("checked") : $cb.removeClass("checked");
							}
						},
					
						customise : function($cb_input){
							if($cb_input.is(".do_not_costumise")){return;}
							
							if($cb_input.not(".afc-checkbox-input")){
								var new_id		= $.fn.nadhiro_lab.actions.generate_id();
								var cb_class		= $cb_input.attr("class") != null ? $cb_input.attr("class") : '';
								var new_cb_class	= "afc-checkbox-container "+cb_class+" ";
								
								$cb_input.attr('_customid', new_id);
								$cb_input.addClass("afc-checkbox-input");
								if($cb_input.is(":checked")){new_cb_class += " checked";}
								if($cb_input.is(":disabled")){new_cb_class += " disabled";}
								
								$("<div>", {
									class : new_cb_class,
									_customid : new_id,
									html : '<div class="checkbox-croix"></div>'
								}).insertAfter($cb_input);
							}
						},
					},
					
					radio : {
						clicked : function($radio){
							if($radio.is(".disabled")){return;}
							var _customid = $radio.attr("_customid");
							$radio_input = $("input[type=radio][_customid="+_customid+"]");
							if($radio_input.length){
								var radio_name	= $radio.attr('name') != null ? $radio.attr('name') : '';
								$radio_input.prop('checked', ($radio_input.is(":checked") ? false : true));
								if($radio_input.is(":checked")){
									$(".afc-radio-container[name="+radio_name+"]").not($radio).removeClass("checked");
									$radio.addClass("checked");
								}else{
									$radio.removeClass("checked");
								}
							}
						},
						
						changed : function($radio_input){
							var _customid = $radio_input.attr("_customid");
							$radio = $(".afc-radio-container[_customid="+_customid+"]");
							
							if($radio.length){
								var radio_name	= $radio_input.attr('name') != null ? $radio_input.attr('name') : '';
								if($radio_input.is(":checked")){
									$(".afc-radio-container[name="+radio_name+"]").not($radio).removeClass("checked");
									$radio.addClass("checked");
								}else{
									$radio.removeClass("checked");
								}
							}
						},
					
						customise : function($radio_input){
							if($radio_input.is(".do_not_costumise")){return;}
							if($radio_input.not(".afc-radio-input")){
								var new_id		= $.fn.nadhiro_lab.actions.generate_id();
								var radio_name	= $radio_input.attr('name') != null ? $radio_input.attr('name') : '';
								var radio_class		= $radio_input.attr("class") != null ? $radio_input.attr("class") : '';
								var new_radio_class	= "afc-radio-container "+radio_class+" ";
								
								$radio_input.attr('_customid', new_id);
								$radio_input.addClass("afc-radio-input");
								
								if($radio_input.is(":checked")){new_radio_class += " checked";}
								if($radio_input.is(":disabled")){new_radio_class += " disabled";}
								
								$("<div>", {
									class : new_radio_class,
									name : radio_name,
									_customid : new_id,
									html : '<div class="radio-inner"></div>'
								}).insertAfter($radio_input);
							}
						},
					},
					
					file : {
						changed : function($file_input){
							var _customid = $file_input.attr("_customid");
							$file = $(".afc-file-container[_customid="+_customid+"]");
							
							if($file.length){
								$file_input.val() == "" ? $file.removeClass("isset") : $file.addClass("isset");
							}
						},
						
						customise : function($file_input){
							if($file_input.is(".do_not_costumise")){return;}
							
							if($file_input.not(".afc-file-input")){
								var file_class			= $file_input.attr("class") != null ? $file_input.attr("class") : '';
								var file_placeholder	= $file_input.attr("placeholder") != null ? $file_input.attr("placeholder") : '';
								var new_file_class		= "afc-file-container afc-btn clickable "+file_class+" ";
								var new_id				= $.fn.nadhiro_lab.actions.generate_id();
								$file_input.attr('_customid', new_id);
								$file_input.addClass("afc-file-input");
								
								if($file_input.is(":disabled")){new_file_class += " disabled";}
								
								$("<div>", {
									class : new_file_class,
									_customid : new_id,
									html : '<i class="fa fa-upload fa-lg"></i>&nbsp;&nbsp;&nbsp;&nbsp;'+file_placeholder+'<div class="file-inner"></div>'
								}).insertAfter($file_input).on("mouseup", function(){
									if(!$file_input.is(":disabled")){
										$("input[type=file][_customid="+new_id+"]").click();
									}
								});
							}
						}
					},
					
					btn : {
						customise : function($button_input){
							if($button_input.is(".do_not_costumise")){
								return;
							}
							var button_type = "__";
							
							switch(true){
								case $button_input.is("input[type=button]") : button_type = "button";
								break;
								case $button_input.is("input[type=reset]") : button_type = "reset";
								break;
								case $button_input.is("input[type=submit]") : button_type = "submit";
								break;
								case $button_input.is(":button"): button_type = "button_tag";
								break;
							}
							
							if(button_type == "button" || button_type == "reset" || button_type == "submit"){
								if($button_input.not('afc-button-input')){
									var button_value		= $button_input.val() != null ? $button_input.val() : '';
									var button_class		= $button_input.attr("class") != null ? $button_input.attr("class") : '';
									var new_id				= $.fn.nadhiro_lab.actions.generate_id();
									var button_new_class	= "afc-btn clickable "+button_class+" ";
									
									$button_input.attr('_customid', new_id);
									$button_input.addClass("afc-button-input");
									
									if(button_type == "reset"){
										button_value += '&nbsp;&nbsp;&nbsp;<i class="fa fa-refresh"></i>';
									}
									
									$("<div>", {
										class : button_new_class,
										html : button_value,
										_customid : new_id
									}).insertAfter($button_input).on("mouseup", function(){
										$("input[type="+button_type+"][_customid="+new_id+"]").click();
									});
								}
							}else{
								$button_input.addClass("afc-btn").addClass("clickable");
							}
						},
					},
					
					number : {
						setValue : function($number_label, value){
							$number = $number_label.parents('.afc-number-container');
							var _customid = $number.attr("_customid");
							$number_input = $("input[type=number][_customid="+_customid+"]");
							
							if($number_input.length){
								$number_input.val(value);
							}
						},
						
						changed : function($number_input){
							var _customid = $number_input.attr("_customid");
							var value = $number_input.val();
							$number = $(".afc-number-container[_customid="+_customid+"]");
							
							if($number.length){
								$('.number-label .input-zone', $number).val(value);
							}
						},
						
						clicked : function($number_btn, signe){
							$number			= $number_btn.parents('.afc-number-container');
							var _customid	= $number.attr("_customid");
							$number_input	= $("input[type=number][_customid="+_customid+"]");
							
							if($number_input.length){
								var number_params		= new Object()
								number_params.max		= $number_input.attr('max') != null && !isNaN(parseFloat($number_input.attr('max'))) ? parseFloat($number_input.attr('max')) : '';
								number_params.min		= $number_input.attr('min') != null && !isNaN(parseFloat($number_input.attr('min'))) ? parseFloat($number_input.attr('min')) : '';
								number_params.step		= $number_input.attr('step') != null && !isNaN(parseFloat($number_input.attr('step'))) ? parseFloat($number_input.attr('step')) : 1;
								number_params.value		= isNaN(parseFloat($number_input.val())) ? 0 : parseFloat($number_input.val());
								number_params.new_value	= parseFloat(number_params.value);
								
								switch(signe){
									case 'plus'		: 
										if(number_params.max == '' || ((number_params.new_value + number_params.step)<=number_params.max)){
											number_params.new_value += parseFloat(number_params.step);
										}
									break;
									case 'minus'	:
										if(number_params.min == '' || (number_params.new_value - number_params.step)>=number_params.min){
											number_params.new_value -= parseFloat(number_params.step);
										}
									break;
								}
								
								$('.number-label .input-zone', $number).val(number_params.new_value);
								$number_input.val(number_params.new_value);
							}
						},
					
						customise : function($number_input){
							if($number_input.is(".do_not_costumise")){return;}
							if($number_input.not(".afc-number-input")){
								var new_id				= $.fn.nadhiro_lab.actions.generate_id();
								var number_class		= $number_input.attr("class") != null ? $number_input.attr("class") : '';
								var new_number_class	= "afc-number-container "+number_class+" ";
								var value				= isNaN(parseFloat($number_input.val())) ? 0 : parseFloat($number_input.val());
								
								$number_input.attr('_customid', new_id);
								$number_input.addClass("afc-number-input");
								
								if($number_input.is(":disabled")){new_number_class += " disabled";}
								
								var number_html = "";
								number_html += '<div class="number-btns">';
								number_html += 		'<div class="plus-btn clickable"><i class="fa fa-plus"></i></div>';
								number_html += 		'<div class="minus-btn clickable"><i class="fa fa-minus"></i></div>';
								number_html += '</div>';
								number_html += '<div class="number-label">';
								number_html += 		'<input type="text" class="input-zone" autocomplete="off" value="'+value+'">';
								number_html += '</div>';
								
								$("<div>", {
									class : new_number_class,
									_customid : new_id,
									html : number_html
								}).insertAfter($number_input);
							}
						},
					},
					
					text : {
						focus : function($text_text){
							$text_text.parents('.afc-text-container').addClass("focus");
						},
						
						blur : function($text_text){
							$text_text.parents('.afc-text-container').removeClass("focus");
						},
						
						keyup : function($text_text){
							var value = $text_text.val().toLowerCase();
							$text		= $text_text.parents('.afc-text-container');
							if(value == ''){
								$('.placeholder', $text).fadeIn(300);
							}else{
								$('.placeholder', $text).fadeOut(150);
							}
							
							var _customid	= $text.attr("_customid");
							$text_input		= $("input[type=text][_customid="+_customid+"]");
							$text_input.val($text_text.val());
							
						},
						
						changed : function($text_input){
							var _customid = $text_input.attr("_customid");
							var value = $text_input.val();
							$text = $(".afc-text-container[_customid="+_customid+"]");
							
							if($text.length){
								$('input-zone', $text).val(value);
							}
						},
					
						customise : function($text_input){
							if($text_input.is(".do_not_costumise")){return;}
							if($text_input.not(".afc-text-input")){
								var new_id				= $.fn.nadhiro_lab.actions.generate_id();
								var text_class			= $text_input.attr("class") != null ? $text_input.attr("class") : '';
								var new_text_class		= "afc-text-container "+text_class+" ";
								var placeholder			= $text_input.attr("placeholder") != null ? $text_input.attr("placeholder") : 'write something..';
								
								$text_input.attr('_customid', new_id);
								$text_input.addClass("afc-text-input");
								
								if($text_input.is(":disabled")){new_text_class += " disabled";}
								
								var text_html = "";
								text_html += '<div class="placeholder">'+placeholder+'</div>';
								text_html += '<input type="text" class="input-zone" autocomplete="off" value="'+$text_input.val()+'">';
								
								$("<div>", {
									class : new_text_class,
									_customid : new_id,
									html : text_html
								}).insertAfter($text_input);
							}
						},
					},
					
					password : {
						focus : function($password_text){
							$password_text.parents('.afc-password-container').addClass("focus");
						},
						
						blur : function($password_text){
							$password_text.parents('.afc-password-container').removeClass("focus");
						},
						
						keyup : function($password_text){
							var value	= $password_text.val().toLowerCase();
							$password	= $password_text.parents('.afc-password-container');
							if(value == ''){
								$('.placeholder', $password).fadeIn(300);
							}else{
								$('.placeholder', $password).fadeOut(150);
							}
							
							var _customid	= $password.attr("_customid");
							$password_input	= $("input[type=password][_customid="+_customid+"]");
							$password_input.val($password_text.val());
						},
						
						changed : function($password_input){
							var _customid = $password_input.attr("_customid");
							var value = $password_input.val();
							$password = $(".afc-password-container[_customid="+_customid+"]");
							
							if($password.length){
								$('input-zone', $password).val(value);
							}
						},
					
						customise : function($password_input){
							if($password_input.is(".do_not_costumise")){return;}
							if($password_input.not(".afc-password-input")){
								var new_id				= $.fn.nadhiro_lab.actions.generate_id();
								var password_class		= $password_input.attr("class") != null ? $password_input.attr("class") : '';
								var new_password_class	= "afc-password-container "+password_class+" ";
								var placeholder			= $password_input.attr("placeholder") != null ? $password_input.attr("placeholder") : 'write something..';
								
								$password_input.attr('_customid', new_id);
								$password_input.addClass("afc-password-input");
								
								if($password_input.is(":disabled")){new_password_class += " disabled";}
								
								var password_html = "";
								password_html += '<div class="placeholder">'+placeholder+'</div>';
								password_html += '<input type="password" class="input-zone" autocomplete="off" value="'+$password_input.val()+'">';
								
								$("<div>", {
									class : new_password_class,
									_customid : new_id,
									html : password_html
								}).insertAfter($password_input);
							}
						},
					},
					
					search : {
						focus : function($search_text){
							$search_text.parents('.afc-search-container').addClass("focus");
						},
						
						blur : function($search_text){
							$search_text.parents('.afc-search-container').removeClass("focus");
						},
						
						keyup : function($search_text){
							var value	= $search_text.val().toLowerCase();
							$search		= $search_text.parents('.afc-search-container');
							if(value == ''){
								$('.placeholder', $search).fadeIn(300);
								$search.removeClass("isset");
							}else{
								$('.placeholder', $search).fadeOut(150);
								$search.addClass("isset");
							}
							
							var _customid	= $search.attr("_customid");
							$search_input	= $("input[type=search][_customid="+_customid+"]");
							$search_input.val($search_text.val());
						},
						
						empty : function($search_empty_btn){
							$search		= $search_empty_btn.parents('.afc-search-container');
							var _customid	= $search.attr("_customid");
							$search_input	= $("input[type=search][_customid="+_customid+"]");
							$search_input.val("");
							$(".search-input-zone .input-zone", $search).val("");
							$('.placeholder', $search).fadeIn(300);
							$search.removeClass("isset");
						},
						
						changed : function($text_input){
							var _customid = $text_input.attr("_customid");
							var value = $text_input.val();
							$text = $(".afc-text-container[_customid="+_customid+"]");
							
							if($text.length){
								$('input-zone', $text).val(value);
							}
						},
					
						customise : function($search_input){
							if($search_input.is(".do_not_costumise")){return;}
							if($search_input.not(".afc-search-input")){
								var new_id			= $.fn.nadhiro_lab.actions.generate_id();
								var _class			= $search_input.attr("class") != null ? $search_input.attr("class") : '';
								var new_class		= "afc-search-container "+_class+" ";
								var placeholder		= $search_input.attr("placeholder") != null ? $search_input.attr("placeholder") : 'write something..';
								
								$search_input.attr('_customid', new_id);
								$search_input.addClass("afc-search-input");
								
								if($search_input.is(":disabled")){new_class += " disabled";}
								
								var search_html = "";
								search_html += 	'<div class="input-mask"><i class="fa fa-search fa-1"></i></div>';
								search_html += 	'<div class="empty-btn"><i class="fa fa-times"></i></div>';
								search_html += 	'<div class="search-input-zone">';
								search_html += 		'<div class="placeholder">'+placeholder+'</div>';
								search_html += 		'<input type="text" class="input-zone" value="'+$search_input.val()+'">';
								search_html += 	'</div>';
								
								$("<div>", {
									class : new_class,
									_customid : new_id,
									html : search_html
								}).insertAfter($search_input);
							}
						},
					},
					
					url : {
						customise : function($url_input){
							if($url_input.is(".do_not_costumise")){return;}
							if($url_input.not('.afc-url-input')){
								var new_id			= $.fn.nadhiro_lab.actions.generate_id();
								var value			= $url_input.val();
								var optionsCount	= $("option", $url_input).length;
								var label			= optionsCount > 0 ? $("option[value="+value+"]", $url_input).html() : "Http";
								var _class			= $url_input.attr("class") != null ? $url_input.attr("class") : '';
								var placeholder		= $url_input.attr("placeholder") != null ? $url_input.attr("placeholder") : 'write somthing..';
								var new_class		= "afc-url-container downside "+_class+" ";
								
								
								$url_input.addClass("afc-url-input");
								$url_input.attr('_customid', new_id);
								
								if($url_input.is(":disabled")){new_class += " disabled";}
								
								var url_html = "";
								url_html += 	'<div class="protocols-list">';
								url_html += 		'<div class="protocols-label">'+label+' <i class="fa fa-caret-down fa-1"></i></div>';//<i class="fa fa-caret-down fa-1"></i>
								url_html += 		'<ul>';
								url_html += 			'<li class="protocol" value="http"><div class="text">Http</div></li>';
								url_html += 			'<li class="protocol" value="https"><div class="text">Https</div></li>';
								url_html += 		'</ul>';
								url_html += 	'</div>';
								url_html += 	'<div class="url-input-zone">';
								url_html += 		'<div class="placeholder">'+placeholder+'</div>';
								url_html += 		'<input type="text" class="input-zone">';
								url_html += 	'</div>';
								
								$("<div>", {
									class : new_class,
									_customid : new_id,
									html : url_html
								}).insertAfter($url_input);
							}
						},
						
						keyup : function($url_text){
							var value = $url_text.val().toLowerCase();
							$url		= $url_text.parents('.afc-url-container');
							if(value == ''){
								$('.placeholder', $url).fadeIn(300);
							}else{
								$('.placeholder', $url).fadeOut(150);
							}
						},
						
						setValue : function($url_text){
							var data = new Object();
							data.fullurl	= "";
							data.protocol	= "";
							data.url		= "";
							
							data.fullurl		= $url_text.val().trim().toLowerCase();
							if(data.fullurl.indexOf("http") == 0){
								data.protocol	= "http";
							}
							
							if(data.fullurl.indexOf("https") == 0){
								data.protocol	= "https";
							}
							
							if(data.protocol != ""){
								data.url = data.fullurl.replace(data.protocol+"://", "");
							}
							
							$url			= $url_text.parents(".afc-url-container");
							var _customid	= $url.attr("_customid");
							$url_input		= $("input[type=url][_customid="+_customid+"]");
							$url_input.val(data.fullurl);
							$url_text.val(data.url);
							
							$(".protocols-list .protocols-label", $url).html($(".protocols-list ul li.protocol[value="+data.protocol+"] .text", $url).html()+' <i class="fa fa-caret-down fa-1"></i>');
						},
						
						label_clicked : function($url_label){
							$url		= $url_label.parents('.afc-url-container');
							$('.afc-url-container').not($url).find('.protocols-list ul').slideUp(1000,"easeOutBounce");
							
							var _height	= $(".protocols-list ul", $url).height() + 10;
							var _top 	= $url.offset().top - $(window).scrollTop();
							if($('.protocols-list ul', $url).is(':visible')){
								$('.protocols-list ul', $url).slideUp(1000,"easeOutBounce");
							}else{
								$('.afc-url-container').not($url).css({"z-index":"0"});
								$url.css({"z-index":"1"});
								if(_top > _height){
									$url.removeClass('downside');
								}else{
									$url.addClass('downside');
								}
								$('.protocols-list ul', $url).hide(100);
								$('.protocols-list ul li.protocol .text', $url).addClass("hidden");
								$('.protocols-list ul', $url).slideDown(100, function(){
									$('.protocols-list ul li.protocol .text', $url).removeClass("hidden");
								});
							}
						},
						
						option_clicked : function($url_option){
							$url = $url_option.parents('.afc-url-container');
							var value = $url_option.attr('value') != null ? $url_option.attr('value') : '';
							var label = $(".text", $url_option).length ? $(".text", $url_option).html() : $url_option.html();
							var _customid	= $url.attr('_customid');
							$url_input		= $("input[type=url][_customid="+_customid+"]");
							$url_input.val(value+$(".url-input-zone .input-zone", $url).val());
							
							
							$('.protocols-list ul', $url).slideUp(1000,"easeOutBounce");
							$('.protocols-list ul li.protocol', $url).not($url_option).removeClass('selected');
							$url_option.addClass('selected');
							
							$.fn.nadhiro_lab.ui.actions.form.url.set_label($url, label);
						},
						
						set_label : function($url, text){
							$('.protocols-list .protocols-label', $url).html(text+' <i class="fa fa-caret-down fa-1"></i>');
						},
					},
				}
			}
		}
	}
	
	$.fn.nadhiro_lab.init();
});