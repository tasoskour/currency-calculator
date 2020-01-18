<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Get all currencies
Route::get("/baseCurrency","CurrenciesController@getBaseCurrencies");
//Get exchange rates for bCur and tCur
Route::get("/exrate/{b_c}/{t_c}","CurrenciesController@getExRate");

//Get all target currencies that exist in db for the base currency
Route::get("/targetCurrency/{b_c}","CurrenciesController@getTargetCurrencies");

//Create new exchange rate and currency
Route::post("/create","CurrenciesController@ExchangeRateCreate");

//Update exchange rate and/or currency
Route::put('edit/{exchangeId}','CurrenciesController@update');

//Update exchange rate and/or currency
Route::delete('delete/{exchangeId}','CurrenciesController@delete');
