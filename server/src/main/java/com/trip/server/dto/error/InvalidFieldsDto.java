package com.trip.server.dto.error;

import java.util.*;

import com.trip.server.dto.error.InvalidFieldDto;
import io.swagger.v3.oas.annotations.media.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "Ошибки, произошедшие при валидации полей")
public class InvalidFieldsDto {

    @Schema(
        description = "Описание ошибки",
        example = "Некоторые поля не прошли валидацию"
    )
    private String message;

    @Schema(
        description = "Список ошибок с описание"
    )
    private List<InvalidFieldDto> errors;

}