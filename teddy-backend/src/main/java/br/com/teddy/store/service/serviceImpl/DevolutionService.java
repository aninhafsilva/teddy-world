package br.com.teddy.store.service.serviceImpl;

import br.com.teddy.store.domain.Customer;
import br.com.teddy.store.domain.Devolution;
import br.com.teddy.store.dto.AttrResponseDTO;
import br.com.teddy.store.dto.FactoryResponseDTO;
import br.com.teddy.store.repostiory.ICustomerRepository;
import br.com.teddy.store.repostiory.IDevolutionRepository;
import br.com.teddy.store.repostiory.IOrdersRepository;
import br.com.teddy.store.service.IDevolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class DevolutionService implements IDevolutionService {

    @Autowired
    IDevolutionRepository devolutions;

    @Autowired
    IOrdersRepository orders;

    @Autowired
    ICustomerRepository customers;

    @Override
    public AttrResponseDTO sendDevolutionRequest(Devolution devolution) throws Exception {
        try {
            devolutions.saveAndFlush(devolution);
        }catch (Exception e) {
            if(e.getClass() == ConstraintViolationException.class) {
                ConstraintViolationException constraintViolationException = (ConstraintViolationException) e;
                StringBuilder errors = new StringBuilder();

                constraintViolationException.getConstraintViolations().forEach(c -> errors.append(c.getMessage()));

                throw new Exception(errors.toString());
            }
            throw new Exception(e.getMessage());
        }
        return FactoryResponseDTO.createDTO(devolution, "CREATE");
    }

    @Override
    public AttrResponseDTO updateDevolutionRequest(Devolution devolution) {
        Devolution dev = devolutions.getById(devolution.getId());
        Customer customer = dev.getOrder().getCustomer();
        Double currentCustomerWalletValue = customer.getWallet().getValue();

        devolution.setOrder(dev.getOrder());
        devolution.setUpdatedAt(LocalDateTime.now());

        customer.getWallet().setValue(currentCustomerWalletValue + devolution.getValue());
        customers.save(customer);
        devolutions.saveAndFlush(devolution);
        return FactoryResponseDTO.createDTO(devolution, "UPDATE");
    }

    @Override
    public List<AttrResponseDTO> findAllDevolutionByCustomerId(Long id) {
        List<AttrResponseDTO> responseDTOList = new ArrayList<>();
        devolutions.findAllDevolutionByCustomerId(id).forEach(d -> responseDTOList.add(FactoryResponseDTO.createDTO(d, "LIST")));
        return responseDTOList;
    }

    @Override
    public List<AttrResponseDTO> findAll() {
        List<AttrResponseDTO> responseDTOList = new ArrayList<>();
        devolutions.findAll(Sort.by(Sort.Order.desc("id"))).forEach(d -> responseDTOList.add(FactoryResponseDTO.createDTO(d, "LIST")));
        return responseDTOList;
    }

    @Override
    public AttrResponseDTO findById(Long id) {
        return FactoryResponseDTO.createDTO(devolutions.getById(id), "CREATE");
    }

    @Override
    public AttrResponseDTO saveAndFlush(Devolution object) {
        return null;
    }

    @Override
    public AttrResponseDTO delete(Long id) {
        return null;
    }
}
