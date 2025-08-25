package com.jeevan.companyms.company;

import java.util.List;
import java.util.Optional;

public interface CompanyService {
    Optional<Company> getCompanyById(Long id);
    List<Company> getAllCompanies();
    boolean updateCompany(Company company, Long id);
    void createCompany(Company company);
    boolean deleteCompanyById(Long id);


}
