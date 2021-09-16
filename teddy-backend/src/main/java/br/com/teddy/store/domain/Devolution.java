package br.com.teddy.store.domain;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Setter
@Entity(name = "_devolution")
@Where(clause = "deleted_at is null")
public class Devolution extends DomainEntity{
    @NotNull
    @NotBlank(message = "O campo Motivo é obrigatório")
    @Size(max = 254)
    private String reason;

    private String answer;

    @OneToOne(cascade = CascadeType.ALL)
    private Order order;
    private StatusDevolution statusDevolution;

    public Devolution() {
        this.statusDevolution = StatusDevolution.WAITING_ANSWER;
    }
}