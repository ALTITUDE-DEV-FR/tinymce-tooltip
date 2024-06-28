/**
 * Tooltip Plugin for TinyMCE
 * @ALTITUDE-DEV.COM x TinyMCE
 */
tinymce.PluginManager.add('tooltip', (editor, url) => {

  const getTooltipText = (selectedNode) => {
    let tooltipParent = selectedNode;
    while (tooltipParent && !tooltipParent.classList.contains('tooltip')) {
      tooltipParent = tooltipParent.parentElement;
    }
    if (tooltipParent) {
      const tooltipTextSpan = tooltipParent.querySelector('.tooltiptext');
      return tooltipTextSpan ? tooltipTextSpan.textContent : '';
    }
    return '';
  };

  const openDialog = (tooltipText = '') => editor.windowManager.open({
    title: 'Add a tooltip',
    body: {
      type: 'panel',
      items: [
        {
          type: 'input',
          name: 'title',
          label: 'Title'
        }
      ]
    },
    initialData: { title: tooltipText },
    buttons: [
      {
        type: 'cancel',
        text: 'Close'
      },
      {
        type: 'submit',
        text: 'Save',
        buttonType: 'primary'
      }
    ],
    onSubmit: (api) => {
      const data = api.getData();
      const selectedNode = editor.selection.getNode();
      let tooltipParent = selectedNode.closest('.tooltip');
      if (tooltipParent) {
        if (data.title === '') {
          const tooltipTextSpan = tooltipParent.querySelector('.tooltiptext');
          if (tooltipTextSpan) {
            tooltipTextSpan.remove();
          }
          while (tooltipParent.firstChild) {
            tooltipParent.parentNode.insertBefore(tooltipParent.firstChild, tooltipParent);
          }
          tooltipParent.remove();
        } else {
          const tooltipTextSpan = tooltipParent.querySelector('.tooltiptext');
          if (tooltipTextSpan) {
            tooltipTextSpan.textContent = data.title;
          }
        }
      } else {
        const selectedText = editor.selection.getContent({ format: 'text' });
        if (selectedText.length > 0 && data.title !== '') {
          const tooltipHtml = `<span class="tooltip">${selectedText}<span class="tooltiptext">${data.title}</span></span>`;
          editor.selection.setContent(tooltipHtml);
        }
      }
      api.close();
    }
  });

  const onAction = () => {
    const selectedNode = editor.selection.getNode();
    const selectedText = editor.selection.getContent({ format: 'text' });
    if (selectedText.length > 0) {
      const tooltipText = getTooltipText(selectedNode);
      openDialog(tooltipText);
    } else {
      console.log("Error, please select a text!");
    }
  };

  editor.ui.registry.addButton('tooltip', {
    tooltip: 'Tooltip',
    icon: 'typography',
    onAction: onAction
  });

  editor.ui.registry.addMenuItem('tooltip', {
    text: 'Tooltip',
    icon: 'typography',
    onAction: onAction
  });

});
