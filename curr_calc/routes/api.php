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
//Get all currencies names
Route::get("/baseCurrency","CurrenciesController@getBaseCurrency");
//Get exchange rate for base currency and target currency
Route::get("/exrates/{b_c}/{t_c}","CurrenciesController@getExchangeRate");
//Create new exchange rate and currency
Route::post("/create","CurrenciesController@ExchangeRateCreate");
