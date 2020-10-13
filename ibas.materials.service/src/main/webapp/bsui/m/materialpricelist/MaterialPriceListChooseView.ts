/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
namespace materials {
    export namespace ui {
        export namespace m {
            /**
             * 选择视图-物料批次
             */
            export class MaterialPriceListChooseView extends ibas.BOChooseView implements app.IMaterialPriceListChooseView {
                /** 返回查询的对象 */
                get queryTarget(): any {
                    return bo.MaterialPriceList;
                }
                /** 绘制视图 */
                draw(): any {
                    let that: this = this;
                    this.list = new sap.extension.m.List("", {
                        chooseType: this.chooseType,
                        growingThreshold: sap.extension.table.visibleRowCount(15),
                        mode: sap.m.ListMode.SingleSelectMaster,
                        items: {
                            path: "/rows",
                            template: new sap.m.ObjectListItem("", {
                                title: "{name} ({objectKey})",
                                firstStatus: new sap.m.ObjectStatus("", {
                                    text: "{currency}"
                                }),
                                secondStatus: new sap.m.ObjectStatus("", {
                                    text: {
                                        path: "taxed",
                                        formatter(data: ibas.emYesNo): string {
                                            if (data === ibas.emYesNo.YES) {
                                                return ibas.i18n.prop("materials_taxed");
                                            }
                                            return ibas.i18n.prop("materials_no_tax");
                                        }
                                    }
                                }),
                                attributes: [
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_basedonlist"),
                                        text: "#{basedOnList} × {factor}"
                                    }).bindProperty("visible", {
                                        path: "basedOnList",
                                        formatter(data: number): boolean {
                                            if (data > 0) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_validdate"),
                                        text: {
                                            path: "validDate",
                                            type: new sap.ui.model.type.Date("", {
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
                                        }
                                    }).bindProperty("visible", {
                                        path: "validDate",
                                        formatter(data: Date): boolean {
                                            if (data instanceof Date) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                    new sap.m.ObjectAttribute("", {
                                        title: ibas.i18n.prop("bo_materialpricelist_invaliddate"),
                                        text: {
                                            path: "invalidDate",
                                            type: new sap.ui.model.type.Date("", {
                                                pattern: "yyyy-MM-dd",
                                                strictParsing: true,
                                            })
                                        }
                                    }).bindProperty("visible", {
                                        path: "invalidDate",
                                        formatter(data: Date): boolean {
                                            if (data instanceof Date) {
                                                return true;
                                            }
                                            return false;
                                        }
                                    }),
                                ]
                            })
                        },
                        nextDataSet(event: sap.ui.base.Event): void {
                            // 查询下一个数据集
                            let data: any = event.getParameter("data");
                            if (ibas.objects.isNull(data)) {
                                return;
                            }
                            if (ibas.objects.isNull(that.lastCriteria)) {
                                return;
                            }
                            let criteria: ibas.ICriteria = that.lastCriteria.next(data);
                            if (ibas.objects.isNull(criteria)) {
                                return;
                            }
                            ibas.logger.log(ibas.emMessageLevel.DEBUG, "result: {0}", criteria.toString());
                            that.fireViewEvents(that.fetchDataEvent, criteria);
                        }
                    });
                    return new sap.extension.m.Dialog("", {
                        title: this.title,
                        type: sap.m.DialogType.Standard,
                        state: sap.ui.core.ValueState.None,
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        content: [
                            this.list
                        ],
                        buttons: [
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_data_choose"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.chooseDataEvent, that.list.getSelecteds());
                                }
                            }),
                            new sap.m.Button("", {
                                text: ibas.i18n.prop("shell_exit"),
                                type: sap.m.ButtonType.Transparent,
                                press: function (): void {
                                    that.fireViewEvents(that.closeEvent);
                                }
                            }),
                        ]
                    });
                }
                private list: sap.extension.m.List;
                /** 显示数据 */
                showData(datas: bo.MaterialPriceList[]): void {
                    let model: sap.ui.model.Model = this.list.getModel();
                    if (model instanceof sap.extension.model.JSONModel) {
                        // 已绑定过数据
                        model.addData(datas);
                    } else {
                        // 未绑定过数据
                        this.list.setModel(new sap.extension.model.JSONModel({ rows: datas }));
                    }
                    this.list.setBusy(false);
                }
                /** 记录上次查询条件，表格滚动时自动触发 */
                query(criteria: ibas.ICriteria): void {
                    super.query(criteria);
                    // 清除历史数据
                    if (this.isDisplayed) {
                        this.list.setBusy(true);
                        this.list.setModel(null);
                    }
                }
            }
        }
    }
}