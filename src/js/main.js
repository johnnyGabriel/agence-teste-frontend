$(function() {

	// insere a custom scrollbar
	$('.scrollable').jScrollPane();

	// controlador dos inputs do formulário de contato
	var Pattern = function(el, regexp) {
		// vars
		this.el = $(el);
		this.regexp = regexp;
		// methods
		this.isValid = function() {
			return (this.regexp.test(this.el.val()) ? true : false);
		};
		// events
		this.el.on('keyup', $.proxy(function() {
			if (this.isValid()) {
				this.el.removeClass('isInvalid');
			} else {
				if (!this.el.hasClass('isInvalid')) {
					this.el.addClass('isInvalid');
				}
			}
		}, this));
	};

	// Máscaras do formulário de contato
	var celularInput = {
		mask: function(val) {
			return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
		},
		options: {
			onKeyPress: function(val, e, field, options) {
				field.mask(celularInput.mask.apply({}, arguments), options);
			}
		}
	};
	$('#cpf').on('focus', function() {
		$(this).mask("999.999.999-99");
	});
	$('#tel').on('focus', function() {
		$(this).mask("(99) 9999-9999");
	});
	
	$('#cel').on('focus', function() {
		$(this).mask(celularInput.mask, celularInput.options);
	});

	// Validações do formulário de contato
	var nome = new Pattern($('#nome'), /^[A-Z-a-z]+(\s[A-Za-z]+)+$/),
		email = new Pattern($('#email'), /^[\w-.]+@([\w-]+\.)+com(\.\w+)?$/),
		cpf = new Pattern($('#cpf'), /^\d{3}.\d{3}.\d{3}-\d{2}$/),
		telefone = new Pattern($('#tel'), /^\(\d{2}\)\s\d{4}-\d{4}$/),
		celular = new Pattern($('#cel'), /^\(\d{2}\)\s\d{4,5}-\d{4}$/);

});

