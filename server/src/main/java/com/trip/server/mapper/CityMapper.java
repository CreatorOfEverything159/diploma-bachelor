package com.trip.server.mapper;

import com.trip.server.database.entity.City;
import com.trip.server.dto.city.CityDto;
import com.trip.server.overpass.model.Element;
import org.modelmapper.ModelMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CityMapper implements Mapper {

    public void init(ModelMapper modelMapper) {
        modelMapper.createTypeMap(Element.class, com.trip.server.overpass.entity.City.class).setConverter(mappingContext -> {
            var element = mappingContext.getSource();
            return new com.trip.server.overpass.entity.City(
                    getOsmId(element),
                    getName(element),
                    getRegion(element),
                    element.getLat(),
                    element.getLon(),
                    getPopulation(element)
            );
        });

        modelMapper.createTypeMap(City.class, CityDto.class).setConverter(mappingContext -> {
            var city = mappingContext.getSource();
            return new CityDto(
                    city.getId(),
                    getImageId(city),
                    city.getName(),
                    city.getRegion(),
                    city.getLat(),
                    city.getLon()
            );
        });
    }

    public static String getOsmId(Element element) {
        return element.getType().getPrefixedId(element.getId());
    }

    public static String getName(Element element) {
        return element.getTags().get("name");
    }

    @Nullable
    public static String getRegion(Element element) {
        return element.getTags().getOrDefault("addr:region", null);
    }

    public static Integer getPopulation(Element element) {
        return Optional.ofNullable(element.getTags().get("population"))
                .map(Integer::parseInt)
                .orElse(0);
    }

    @Nullable
    public static Long getImageId(City city) {
        return city.getImage() != null ? city.getImage().getId() : null;
    }

}
