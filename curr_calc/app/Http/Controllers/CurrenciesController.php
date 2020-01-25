<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ExchangeRate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
    return   response()->json( $currencies,200);
    }

//Create new exchange rate and currency
public function ExchangeRateCreate(Request $request){

$validator = Validator::make($request->all(),[
    'baseCur' => [
        'required',
        'max:25',
        /*Create only unique combination for target and base currency*/
        Rule::unique('rates')->where(function ($query) use($request) {
            return $query->where('baseCur', $request->baseCur)
            ->where('targetCur', $request->targetCur);
        }),
    ],
    'targetCur' =>'required||max:25',
    'rate' => 'required|numeric|between:0,99999.999999',

  ]);

   if($validator->fails()){
      $messages = $validator->messages();
            return response()->json($messages->all(),422);
        }

     else{$exrate = ExchangeRate::create($request->all());
         return response()->json(["Added successfully"], 201) ;
       }
}
//Update existing exchange rate and currencies
public function update(Request $request,ExchangeRate $exchangeId){

  $validator = Validator::make($request->all(),[
      'baseCur' => [
          'required',
          'max:25',
          /*Create only unique combination for target and base currency*/
          Rule::unique('rates')->where(function ($query) use($request,$exchangeId) {
              return $query->where('baseCur', $request->baseCur)
              ->where('targetCur', $request->targetCur)
              ->where('id','!=', $exchangeId->id);

          }),
      ],
      'targetCur' =>'required||max:25',
      'rate' => 'required|numeric|between:0,99999.999999',

    ]);

   if($validator->fails()){
     $messages = $validator->messages();
           return response()->json($messages->all(),422);
       }
   else{  $exchangeId->update($request->all());
          $updateMesg=array("Updated successfully");
          return response()->json($updateMesg,200);}

}

//Delete exchange rate by id
public function delete(ExchangeRate $exchangeId){
  $exchangeId->delete();
  $deleteMsg=array("Delete successfully");
   return $deleteMsg;
}
}
