
"use strict";

import "core-js";
//import "regenerator-runtime/runtime";
import MImageMap from './MImageMap';

function Main(e)
{
    window.mimagemap = new MImageMap();

} // Main


function OnLoaded(e)
{
    window.mimagemap.Skin( '.mimagemap img' );
    demo_main();

} // OnLoaded

window.GLOB =
{
    console          : null,
    tooltip          : null,
    body             : null,
    image            : null,
    mimagemap_cont   : null,
    mimagemap_options:
    {
        SELECTOR : '.mimagemap img'
    }
};

let _statechange_select     = null;
let _statechange_links_cont = null;



function demo_main()
{
    GLOB.body           = document.body;
    GLOB.console        = document.querySelector( '.console > div' );
    GLOB.tooltip        = document.createElement( 'div' );
    GLOB.mimagemap_cont = document.querySelector('.mimagemap');
    GLOB.image          = document.querySelector( GLOB.mimagemap_options.SELECTOR );

    GLOB.tooltip.classList.add( "imagemap-tooltip" );

    GLOB.body.appendChild( GLOB.tooltip );

        
        
    var image = document.querySelector( GLOB.mimagemap_options.SELECTOR );
        image.obj_mimagemap.del_on_area_enter_before = demo_del_on_area_enter_before;
        image.obj_mimagemap.del_on_area_leave_before = demo_del_on_area_leave_before;
        image.obj_mimagemap.del_on_area_click_before = demo_del_on_area_click_before;
        image.obj_mimagemap.del_on_area_click_after  = demo_del_on_area_click_after;

    // demo buttons
    document.querySelector('#set-all-selected'  ).addEventListener( 'click',  demo_set_all_selected_state   );
    document.querySelector('#set-all-deselected').addEventListener( 'click',  demo_set_all_deselected_state );
    document.querySelector('#resize-map'        ).addEventListener( 'click',  demo_resize_map               );

    demo_state_changes();

} // demo_main

function demo_state_changes()
{
    _statechange_select     = document.querySelector( '.states select' );
    _statechange_links_cont = document.querySelector( '.states > div:first-child + div' );
    _statechange_links_cont.innerHtml = '';
    
    var _links_html_out = '';
    for( var state in window.mimagemap.states )
    {
        _links_html_out += '<a href="#" rel="' + state + '">set state ' + state + '</a><br />';
        let _a           = document.createElement( "a" );
        let _br          = document.createElement( "br" );
            _a.href      = "#";
            _a.rel       = state;
            _a.innerText = "set state " + state;

        _statechange_links_cont.appendChild( _a );
        _statechange_links_cont.appendChild( _br );

        _a.addEventListener
        (
            'click',
            (e)=>
            {
                e.preventDefault();

                var _selected = [];
                for( var x = 0; x < _statechange_select.options.length; x++ )
                    if( _statechange_select.options[x].selected )
                        _selected.push( _statechange_select.options[x].value );

                if( _selected.length > 0 )
                    window.mimagemap.SetAreaStateList( GLOB.image.obj_mimagemap, _selected, e.target.rel );
            }
        );

    } // for

} // demo_init_state_changes()



function demo_set_all_selected_state(e)
{
    e.preventDefault();

    window.mimagemap.SetMapState( GLOB.image.obj_mimagemap, window.mimagemap.states.SELECTED );

} // demo_set_all_selected_state



function demo_set_all_deselected_state(e)
{
    e.preventDefault();

    window.mimagemap.SetMapState( GLOB.image.obj_mimagemap, window.mimagemap.states.DEFAULT );

} // demo_set_all_deselected_state



function demo_del_on_area_enter_before( area )
{
    var _left, _top;

    GLOB.tooltip.style["display"] = "block";
    GLOB.tooltip.appendChild( document.createElement( "span" ) );
    
    _left = area.obj_mimagemap_rectx + (area.obj_mimagemap_rectw/2) - GLOB.tooltip.offsetWidth/2;
    _top  = area.obj_mimagemap_rect_minxy[1] + GLOB.tooltip.offsetHeight;

    GLOB.tooltip.style["left"]        = _left + "px";
    GLOB.tooltip.style["top"]         = _top  + "px";
    GLOB.tooltip.style["margin-left"] = -12;
    GLOB.tooltip.innerText = area.attributes["data-id"].value;

} // demo_del_on_area_enter_before



function demo_del_on_area_leave_before( area )
{
    GLOB.tooltip.style["display"] = "none";

} // demo_del_on_area_leave_before



function demo_del_on_area_click_before( area )
{
    clog( area.alt + ' clicked:' + area.obj_mimagemap_state );

} // demo_del_on_area_click_before



function demo_del_on_area_click_after( area )
{
    clog( area.alt + ' clicked:' + area.obj_mimagemap_state );

} // demo_del_on_area_click_after



function demo_resize_map(e)
{
    e.preventDefault();
    
    var _w = parseInt( document.querySelector('#resize-map-width' ).value );

    if( isNaN(_w) || _w > 1280 )
    {
        alert( 'Enter Number values < 1280' );
        return;
    }

    window.mimagemap.Resize( GLOB.image, _w );

} // demo_resize_map



function clog(object)
{
    GLOB.console.insertAdjacentHTML( 'beforeend', `${object}<br>` );
    GLOB.console.scrollTop = ( 99999 );

} // clog

window.addEventListener( "DOMContentLoaded", Main );
window.addEventListener( "load",             OnLoaded );
