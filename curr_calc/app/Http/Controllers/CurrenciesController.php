<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExchangeRate;

class CurrenciesController extends Controller
{
//Get all currencies names
public function getBaseCurrencies() {

    $currencies=ExchangeRate::select('baseCur')->distinct()->get();
    return $currencies;
    }

//Get target currencies for given base currency
public function getTargetCurrencies( $b_c){
       $tCurrencies=ExchangeRate::where('baseCur', $b_c)->get();
       return   response( $tCurrencies,200);
       }
//Get target currencies for given base currency
public function getExRate( $b_c,$t_c){
    $currencies=ExchangeRate::where([['baseCur', $b_c],['targetCur',$t_c]])->first();
    return   response( $currencies,200);
    }

//Create new exchange rate and currency
public function ExchangeRateCreate(Request $request){
/*  $this->validate($request, [
  'baseCur' => 'required|unique:products|max:255',
  'targetCur' => 'required',
  'rate' => 'integer'

]);*/
  $exrate = ExchangeRate::create($request->all());
        return response()->json($exrate, 201);
}

public function update(Request $request,ExchangeRate $exchangeId){
  $exchangeId->update($request->all());

          return response()->json($exchangeId, 200);

}
}
