package com.edac.project.models.common;

import java.util.HashMap;
import java.util.Map;

public class SeatMapping {

    public Map<Character,Integer> seatMap = new HashMap<>();

    public SeatMapping() {
    }

    public Map<Character, Integer> getSeatMap() {
        //TODO: hrad coded seating
        int i = 0;
        for(char alphabet = 'A'; alphabet <='G'; alphabet++ ) {
            seatMap.put(alphabet, i++);
        }
        return seatMap;
    }
}
