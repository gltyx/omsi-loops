Views.registerView("menu", {
    selector: "#menu",
    html() {
        let html = "";
        html += Views.menu.htmlChangelog();
        html += Views.menu.htmlSaveMenu();
        html += Views.menu.htmlFAQMenu();
        html += Views.menu.htmlOptionsMenu();
        html += Views.menu.htmlChallengeMenu();
        html += Views.menu.htmlTotalsMenu();
        return html;
    },
    versions() {
        let html = "";
        const versions = _txtsObj("menu>changelog>version");
        $(versions).each((_index, version) => {
            html += `<div class='showthat2'>
                        ${`${_txt("menu>changelog>meta>version_prefix")} ${$(version).attr("verNum")}`}
                        <div class='showthis2'>
                            ${$(version).text()}
                        </div>
                    </div>
                    `;
        });
        return html;
    },
    htmlChangelog() {
        const html =
        `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>changelog>meta>title")}
            <div style='max-width: 71px;' class='showthisH' id='changelog'>
                ${this.versions()}
            </div>
        </div>`;
        return html;
    },
    htmlSaveMenu() {
        const html =
        `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>save>meta>title")}
            <div class='showthisH'>
                <div class='button' onclick='save()'>${_txt("menu>save>manual_save")}</div>
                <br>
                <textarea id='exportImportList'></textarea><label for='exportImportList'> ${_txt("menu>save>list_label")}</label>
                <br>
                <div class='button' style='margin-right: 2px;' onclick='exportCurrentList()'>${_txt("menu>save>export_button")}</div>
                <div class='button' onclick='importCurrentList()'>${_txt("menu>save>import_button")}</div>
                <br>
                ${_txt("menu>save>list_comment")}
                <br><br>
                <input id='exportImport'><label for='exportImport'> ${_txt("menu>save>input_label")}</label><br>
                <div class='button' style='margin-top: 5px; margin-right: 2px;' onclick='exportSave()'>${_txt("menu>save>export_button")}</div>
                <div class='button' style='margin-top: 1px;' onclick='importSave()'>${_txt("menu>save>import_button")}</div><br>
                ${_txt("menu>save>export_comment")}<br>
                ${_txt("menu>save>import_comment")}
                <br>
            </div>
        </div>`;
        return html;
    },
    FAQs() {
        let html = "";
        const QAs = _txtsObj("menu>faq>q_a");
        $(QAs).each((_index, QA) => {
            html += 
            `${_txt("menu>faq>meta>q_prefix")} <i>"${$(QA).find("q").html()}"</i><br>
            ${_txt("menu>faq>meta>a_prefix")} ${$(QA).find("a").html()}<br>
            <br>`;
        });
        return html;
    },
    htmlFAQMenu() {
        const html = 
        `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>faq>meta>title")}
            <div class='showthisH'>
                ${this.FAQs()}
            </div>
        </div>`;
        return html;
    },
    htmlOptionsMenu() {
        const html =
            `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>options>meta>title")}
            <div class='showthisH'>
                <a target='_blank' href='${_txt("menu>options>discord>link")}'>${_txt("menu>options>discord>title")}</a><br>
                ${Views.menu.htmlThemeMenu()}
                ${Object.keys(Localization.supportedLang).length > 1 ? Views.menu.htmlLocalizationMenu() : ""}
                ${_txt("menu>options>adblock_warning")}<br>
                <input id='highlightNewInput' type='checkbox' onchange='setOption("highlightNew", this.checked)'/>
                    <label for='highlightNewInput'>${_txt("menu>options>highlight_new")}</label>
                <br>
                <input id='statColorsInput' type='checkbox' onchange='setOption("statColors", this.checked)'/>
                    <label for='statColorsInput'>${_txt("menu>options>stat_colors")}</label>
                <br>
                <input id='pingOnPauseInput' type='checkbox' onchange='setOption("pingOnPause", this.checked)'/>
                    <label for='pingOnPauseInput'>${_txt("menu>options>pause_audio_cue")}</label>
                <br>
                <input id='autoMaxTrainingInput' type='checkbox' onchange='setOption("autoMaxTraining", this.checked)'/>
                    <label for='autoMaxTrainingInput'>${_txt("menu>options>auto_max_training")}</label>
                <br>
                <input id='hotkeysInput' type='checkbox' onchange='setOption("hotkeys", this.checked)'/>
                    <label class='showthat' for='hotkeysInput'>${_txt("menu>options>hotkeys")}
                    <div class='showthis'>${_txt("menu>options>hotkeys_tooltip")}</div>
                </label>
                <br>
                ${_txt("menu>options>update_rate")}
                <input id='updateRateInput' type='number' value='50' min='1' style='width: 50px;transform: translateY(-2px);' oninput='setOption("updateRate", parseInt(this.value))' />
                <br>
                ${_txt("menu>options>autosave_rate")}
                <input id='autosaveRateInput' type='number' value='30' min='1' style='width: 50px;transform: translateY(-2px);' oninput='setOption("autosaveRate", parseInt(this.value))' />
                <br>
            </div>
        </div>`;
        return html;
    },
    htmlLocalizationMenu() {
        const lg = Localization.supportedLang;
        let html = `${_txt("menu>options>localization_title")}: <select id='localization_menu' onchange='Localization.change();'>`;
        $.each(lg, (val, str) => {
            html += `<option value='${val}'${Localization.currentLang === val ? "selected" : ""}>${str}</option>`;
        });
        html += "</select><br>";
        return html;
    },
    htmlThemeMenu() {
        const themeList = ["normal", "dark", "cubic"];
        const themes = _txtsObj("menu>options>theme");
        let html = `${_txt("menu>options>theme_title")}: <select id='themeInput' onchange='view.changeTheme();'>`;
        $(themes).each((index, theme) => {
            html += `<option value='${themeList[index]}'>${$(theme).find(themeList[index]).text()}</option>`;
        });
        html += "</select><br>";
        return html;
    },
    htmlChallengeMenu() {
        const html = 
        `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>challenges>meta>title")}
            <div class='showthisH'>
                ${this.challenges()}
            </div>
        </div>`;
        return html;
    },
    htmlTotalsMenu() {
        const html = 
        `<div style='display:inline-block;height:30px;margin-left:10px;' class='showthatH'>
            ${_txt("menu>totals>meta>title")}
            <div class='showthisH'>
                ${this.totals()}
            </div>
        </div>`;
        return html;
    },
    challenges() {
        let html = 
        `<div>挑战是增加了严格限制和特殊条件的特殊模式.<br> 
            它没有奖励只是单纯的好玩.<br>
            我建议你至少在通关游戏后再考虑尝试它.<br>
            开始挑战前别忘了导出你的存档.<br>
            <b>开始挑战会完全清空你的存档.</b><br>
            `;
        html += 
        `<div class='button showthat control' style='margin-top: 2px;' onclick='beginChallenge(1)'>法力枯竭 
            <div class='showthis' style='color:black;width:230px;margin-left:100px;'>${_txt("menu>challenges>mana_drought")}</div>
        </div><br>
        <div class='button showthat control' style='margin-top: 2px;' onclick='beginChallenge(2)'>肌无力
            <div class='showthis' style='color:black;width:230px;margin-left:100px;'>${_txt("menu>challenges>noodle_arms")}</div>
        </div><br>
        <div class='button showthat control' style='margin-top: 2px;' onclick='beginChallenge(3)'>法力燃烧
            <div class='showthis' style='color:black;width:230px;margin-left:100px;'>${_txt("menu>challenges>mana_burn")}</div>
        </div><br>`
        html += `</div>`
        return html;
    },
    totals() {
        let html =
        `<div>
        实际时间: <div id='totalEffectiveTime'></div><br>
        游玩时间: <div id='totalPlaytime'></div><br>
        循环: <div id='totalLoops'></div><br>
        行动: <div id='totalActions'></div><br>
        </div>`;
        return html;
    }
});
