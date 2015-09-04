/**
 * Created by mike on 2015-08-10.
 */
"use strict";

var inputValues =[];            /* List of user input values */
var totalCups = 0;
var totalGram = 0;
var ratios = [ 0.25, 0.33333333333, 0.5, 0.75, 1];

var unitGram = 247.23;

$(document).ready(function(){
    totalCups = new Fraction(0);

    var $display = $('.input-display');


    $('.unit-gram').html(unitGram);

    $('.cups-btns').on('click', 'button', function(){

        if ($(this).attr('id') == 'reset' ) {
            inputValues.length = 0;
            $('#total-cup').val(0);
        } else {
            inputValues.push($(this).html());
            var lastItem = (inputValues[inputValues.length-1]).split("/");
            totalCups = totalCups.add(new Fraction(lastItem[0], lastItem[1]));

            var strTotalCups = "";
            var bigNumber =  Math.floor(totalCups.numerator / totalCups.denominator);
            var leastFraction = (new Fraction(totalCups.numerator % totalCups.denominator, totalCups.denominator));

            if (bigNumber > 0) {
                strTotalCups += bigNumber;

                if (leastFraction.numerator > 0) {
                    strTotalCups += " & ";
                }
            }
            if (leastFraction.numerator > 0) {
                strTotalCups += leastFraction.toString();
            }
            $('#total-cup').val(strTotalCups);
        }

        $display.empty();
        $display.append('<div class="fraction"></div>');
        var $fraction = $('.fraction');

        for (var i in inputValues) {
            var fraction = inputValues[i].split("/");

            $fraction.append('<div class="cell"><span class="top">'+fraction[0]+'</span><span class="bottom">'+fraction[1]+'</span></div>');
            $fraction.append('<div class="cell">+</div>')
        }

        totalGram += ratios[$(this).attr('id')] * unitGram;
        if ($.isNumeric(totalGram)) {
            $('#total-gram').val(Math.round(totalGram * 100) / 100);

            $('.fraction').scrollLeft($('.cell:last-child').position().left);       // move to the right
        } else {
            totalGram = 0;
            $('#total-gram').val('0');
            totalCups = new Fraction(0);
        }
    });
});