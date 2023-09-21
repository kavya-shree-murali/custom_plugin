import {
    ApiClient
} from "src/app/global-service/api-client";

declare var Tribute: any;
import * as $ from 'jquery'
// declare var $: any;
// import Tribute from "tributejs";

export class Transliterate {
    language: string = '';
    transliterationInput: any = '';
    menuContainerSelector: string = '';
    tributeAutocomplete: any = null;

    constructor(language: string, transliterationInput, menuContainerSelector?) {
        this.language = language;
        this.transliterationInput = transliterationInput;
        this.menuContainerSelector = menuContainerSelector;
    }


    init() {
        var apiClient = new ApiClient(this.language);
        // ta - tamil
        //fr - french
        // hi -hindi

        var self = this;

        var options: any = {
            autocompleteMode: true,
            noMatchTemplate: "",
            spaceSelectsMatch: true,
            values: function (text, cb) {
                apiClient.getSuggestions(text).then(data => {
                    return cb(data);
                });
            },
            // lookup: 'value',
            // fillAttr: 'value',
            /*selectTemplate: function (item) {
                if (typeof item === "undefined") return null;
                if (this.range.isContentEditable(this.current.element)) {
                    return (
                        '<span contenteditable="false"><a>' +
                        item.original.key +
                        "</a></span>"
                    );
                }
    
                return item.original.value;
            },*/
            menuItemTemplate: function (item) {
                return item.string;
            }
        };


        var tribute = self.menuContainerSelector ?
            new Tribute(
                Object.assign(
                    {
                        menuContainer: $(self.menuContainerSelector)[0]
                    },
                    options
                )

            ) : new Tribute(options);


        this.tributeAutocomplete = tribute;

        this.attach();
        return tribute;
    }

    attach() {
        this.tributeAutocomplete.attach(
            $(this.transliterationInput)[0]
        );
    }



}

