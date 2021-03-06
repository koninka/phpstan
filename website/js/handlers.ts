import * as ko from 'knockout';
import * as CodeMirror from 'codemirror';

ko.bindingHandlers.codeMirror = {
	init: (element, valueAccessor, allBindings, viewModel, bindingContext) => {
		const editorSettings: any = {
			mode: 'application/x-httpd-php',
			lineSeparator: '\n',
			indentWithTabs: true,
			indentUnit: 4,
			lineNumbers: true,
			matchBrackets: true,
			theme: 'ttcn',
			inputStyle: 'contenteditable',
			viewportMargin: Infinity,
			lineWrapping: true,
		};
		const codeMirror: any = CodeMirror.fromTextArea(element, editorSettings);
		codeMirror.getDoc().on('change', () => {
			const observable = valueAccessor();
			observable(codeMirror.getDoc().getValue());
		});

		ko.utils.domData.set(element, 'codeMirror', codeMirror);
	},
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) => {
		const codeMirror: any = ko.utils.domData.get(element, 'codeMirror');

		const doc = codeMirror.getDoc();
		const oldValue = doc.getValue();
		const newValue = ko.unwrap(valueAccessor());
		if (oldValue === newValue) {
			return;
		}
		codeMirror.getDoc().setValue(newValue);
	},
};
