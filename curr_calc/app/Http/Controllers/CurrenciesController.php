<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExchangeRate;
use App\Currency;

class CurrenciesController extends Controller
{
    //Get all currencies names
    public function getBaseCurrency() {
$currencies=Currency::get();
return $currencies;
    }

    //Get target currencies for given base currency
    public function getTargetCurrency($b_c){
      $tCurrencies=ExchangeRate::where('baseCur', $b_c)->get();
  return   response( $tCurrencies,200);
      }

    //Get exchange rate for base currency and target currency
  public function getExchangeRate($b_c,$t_c){
return    response(ExchangeRate::where([
                    ['baseCur', $b_c],
                    ['targetCur',$t_c]
                ])->first(),200);
    }
  //Create new exchange rate and currency
public function ExchangeRateCreate(Request $request){

  $exrate = Currency::create($request->all());
        return response()->json($exrate, 201);
}


}
