'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">illustrator.js documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BackgroundColorTool.html" data-type="entity-link" >BackgroundColorTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseShapeTool.html" data-type="entity-link" >BaseShapeTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/Colors.html" data-type="entity-link" >Colors</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorSwatches.html" data-type="entity-link" >ColorSwatches</a>
                            </li>
                            <li class="link">
                                <a href="classes/ColorUtil.html" data-type="entity-link" >ColorUtil</a>
                            </li>
                            <li class="link">
                                <a href="classes/ConvolutionTool.html" data-type="entity-link" >ConvolutionTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataSource.html" data-type="entity-link" >DataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/EllipseTool.html" data-type="entity-link" >EllipseTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/EraserTool.html" data-type="entity-link" >EraserTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterTool.html" data-type="entity-link" >FilterTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/Illustrator.html" data-type="entity-link" >Illustrator</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorAnimation.html" data-type="entity-link" >IllustratorAnimation</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorCollection.html" data-type="entity-link" >IllustratorCollection</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorColor.html" data-type="entity-link" >IllustratorColor</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorImage.html" data-type="entity-link" >IllustratorImage</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorImageManager.html" data-type="entity-link" >IllustratorImageManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageLoader.html" data-type="entity-link" >ImageLoader</a>
                            </li>
                            <li class="link">
                                <a href="classes/ImageTool.html" data-type="entity-link" >ImageTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/Layer.html" data-type="entity-link" >Layer</a>
                            </li>
                            <li class="link">
                                <a href="classes/LayerManager.html" data-type="entity-link" >LayerManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/LayerTools.html" data-type="entity-link" >LayerTools</a>
                            </li>
                            <li class="link">
                                <a href="classes/LayerUtils.html" data-type="entity-link" >LayerUtils</a>
                            </li>
                            <li class="link">
                                <a href="classes/LineTool.html" data-type="entity-link" >LineTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/PixelsTool.html" data-type="entity-link" >PixelsTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/RectangleTool.html" data-type="entity-link" >RectangleTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ShadowTool.html" data-type="entity-link" >ShadowTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/SharpenTool.html" data-type="entity-link" >SharpenTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/TextTool.html" data-type="entity-link" >TextTool</a>
                            </li>
                            <li class="link">
                                <a href="classes/ToolBox.html" data-type="entity-link" >ToolBox</a>
                            </li>
                            <li class="link">
                                <a href="classes/TransformTool.html" data-type="entity-link" >TransformTool</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ArcToPoint.html" data-type="entity-link" >ArcToPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorConfig.html" data-type="entity-link" >ColorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConvolutionOptions.html" data-type="entity-link" >ConvolutionOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateLayerOptions.html" data-type="entity-link" >CreateLayerOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CubicBezierCurveOptions.html" data-type="entity-link" >CubicBezierCurveOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawArcOptions.html" data-type="entity-link" >DrawArcOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DrawEllipseOptions.html" data-type="entity-link" >DrawEllipseOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EraserOptions.html" data-type="entity-link" >EraserOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FrameLayer.html" data-type="entity-link" >FrameLayer</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IllustratorColorData.html" data-type="entity-link" >IllustratorColorData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IllustratorDataSource.html" data-type="entity-link" >IllustratorDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IllustratorExportConfig.html" data-type="entity-link" >IllustratorExportConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ImageDataSource.html" data-type="entity-link" >ImageDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerToolConfig.html" data-type="entity-link" >LayerToolConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerTransformationData.html" data-type="entity-link" >LayerTransformationData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LayerWrapper.html" data-type="entity-link" >LayerWrapper</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PixelTransformerContext.html" data-type="entity-link" >PixelTransformerContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PixelTransformerRenderContext.html" data-type="entity-link" >PixelTransformerRenderContext</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuadraticBezierCurveOptions.html" data-type="entity-link" >QuadraticBezierCurveOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RawImageData.html" data-type="entity-link" >RawImageData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RectangleOptions.html" data-type="entity-link" >RectangleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoundedRectangleOptions.html" data-type="entity-link" >RoundedRectangleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TextDataSource.html" data-type="entity-link" >TextDataSource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TransformOptions.html" data-type="entity-link" >TransformOptions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});