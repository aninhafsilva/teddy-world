package br.com.teddy.store.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity(name = "_tracking")
@Where(clause = "deleted_at is null")
public class Tracking extends DomainEntity{
    private String tracking;
}
