<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExchangeRate;
use Illuminate\Support\Facades\Validator;

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
  $validator = Validator::make($request->all(), [
  'baseCur' => 'required|max:25' ,
  'targetCur' => 'required|max:25',
  'rate' => 'required|numeric|between:0,99999.999999'
 ]);

   if($validator->fails()){
            return response($validator->errors()->first(), 422);
        }

     else{$exrate = ExchangeRate::create($request->all());
         return response()->json($exrate, 201);}


}
//Update existing exchange rate and currencies
public function update(Request $request,ExchangeRate $exchangeId){

  $validator = Validator::make($request->all(), [
  'baseCur' => 'required|max:25' ,
  'targetCur' => 'required|max:25',
  'rate' => 'required|numeric|between:0,99999.999999'
 ]);

   if($validator->fails()){
            return response($validator->errors()->first(), 422);
        }
else{  $exchangeId->update($request->all());

          return response()->json($exchangeId, 200);}

}

//Delete exchange rate by id
public function delete(ExchangeRate $exchangeId){
  $exchangeId->delete();
          return response()->json($exchangeId, 204);
}
}
