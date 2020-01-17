<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExchangeRate;
use App\Currency;

class CurrenciesController extends Controller
{
    //
    public function getBaseCurrency() {
$currencies=Currency::get();
return $currencies;
    }

  public function getExchangeRate($b_c,$t_c){
return    response(ExchangeRate::where([
                    ['baseCur', $b_c],
                    ['targetCur',$t_c]
                ])->first()->value("rate"),200);

    }
public function ExchangeRateCreate(Request $request){

  $exrate = Currency::create($request->all());
        return response()->json($exrate, 201);
}


}
