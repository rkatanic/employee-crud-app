package com.example.cruddemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cruddemo.entity.Employee;
import com.example.cruddemo.service.EmployeeService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class EmployeeRESTController {

	private EmployeeService employeeService;

	@Autowired
	public EmployeeRESTController(EmployeeService theEmployeeService) {
		employeeService = theEmployeeService;

	}

	// expose "/employees" and return all employees
	@GetMapping("/employees")
	public List<Employee> findAll() {
		return employeeService.findAll();
	}

	// add mapping for GET /employee/ {employeeId}
	@GetMapping("/employees/{employeeID}")
	public Employee getEmployee(@PathVariable int employeeID) {
		Employee theEmployee = employeeService.findById(employeeID);
		if (theEmployee == null) {
			throw new RuntimeException("Employee id not fount - " + employeeID);
		}
		return theEmployee;
	}

	// add mapping for POST /employees - add new employee
	@PostMapping("/employees")
	public Employee addEmployee(@RequestBody Employee theEmployee) {

		// also just in case it passes an id in JSON ... set id to 0
		// this is to force save of new item instead of doing an update
		theEmployee.setId(0);

		employeeService.save(theEmployee);

		return theEmployee;
	}

	// add mapping for PUT /employees - update existing employee
	@PutMapping("/employees")
	public Employee updateEmployee(@RequestBody Employee theEmployee) {

		employeeService.save(theEmployee);

		return theEmployee;
	}

	// add mapping for DELETE /employees/{employeeID}
	@DeleteMapping("/employees/{employeeID}")
	public String deleteEmployee(@PathVariable int employeeID) {

		Employee tempEmployee = employeeService.findById(employeeID);

		if (tempEmployee == null) {
			throw new RuntimeException("Employee id not found: " + employeeID);
		}

		employeeService.deleteById(employeeID);

		return "Deleted employee with id - "+employeeID;
	}
}
