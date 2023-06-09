package com.trip.server.database.entity;

import com.trip.server.model.Coordinatable;
import com.trip.server.model.Identifiable;
import com.trip.server.model.OsmIdentifiable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@Entity(name = "city")
public class City implements Identifiable, OsmIdentifiable, Coordinatable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "image_id")
    @Nullable
    private Image image;

    private String osmId;

    private String name;

    private String region;

    private Double lat;

    private Double lon;

}
