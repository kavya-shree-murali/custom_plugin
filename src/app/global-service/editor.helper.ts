
import suneditor from 'suneditor';
import plugins from 'suneditor/src/plugins';
import {
    // command
    blockquote,
    // Submenu
    align,
    font,
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    paragraphStyle,
    table,
    template,
    textStyle,
    // Dialog
    image,
    link,
    video,
    math
} from 'suneditor/src/plugins'
import { ButtonListItem } from 'suneditor/src/options';
// import { SubmenuPlugin } from 'suneditor/src/plugins/SubmenuPlugin';


export function initEditor(element:any) {
   return suneditor.create(element, {
        plugins: plugins,
        height: '240',
        width: '100%',
        buttonList: [
            ["undo", "redo",
                "font", "fontSize", "formatBlock",
                "paragraphStyle", "blockquote",
                "bold", "underline", "italic", "strike", "subscript", "superscript",
                "fontColor", "hiliteColor", "textStyle",
                "removeFormat",
                "outdent", "indent",
                "align", "horizontalRule", "list", "lineHeight",
                "table", "link", "image", "video",
                "fullScreen", "showBlocks", "codeView",
                "preview", "print"] as ButtonListItem
        ]
    });
}