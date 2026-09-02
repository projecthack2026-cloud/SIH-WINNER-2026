# MPLADS Financial Formulas & Business Logic

This document specifies the exact business logic and mathematical formulas used across the backend FastAPI services and database aggregation views.

## 1. Monetary Data Type Specification
All financial metrics in PostgreSQL use **`NUMERIC(15, 2)`** to prevent floating-point rounding inaccuracies.

Source strings (e.g. `₹ 1,50,000.00` or `150000`) are sanitized by stripping `₹`, `,`, and whitespace before casting to `NUMERIC`.

## 2. Core Financial Metric Definitions

### 2.1 Recommended Amount (`recommended_amount`)
$$\text{Recommended Amount} = \text{RECOMMENDED AMOUNT (₹)}$$
Sum of funds requested by MPs for specific works in `Works Recommended`.

### 2.2 Sanction Amount (`sanction_amount`)
$$\text{Sanction Amount} = \text{Sanction Amount (₹)}$$
Sum of funds formally approved by District Authorities in `Works Sanctioned`.

### 2.3 Total Expenditure (`total_expenditure`)
$$\text{Total Expenditure} = \sum \text{Fund Disbursed Amount (₹)} \quad \text{per Work ID}$$
Aggregate payment disbursed to vendors across all expenditure transactions for a project.

### 2.4 Allocated Limit (`allocated_amount`)
$$\text{Allocated Limit} = \text{Allocated AMOUNT (₹)} \quad \text{per MP / Constituency}$$
Financial ceiling assigned to an MP for their tenure from `Allocated Limit for Honble MPs`.

### 2.5 Calamity Consent Amount (`consent_amount`)
$$\text{Calamity Consent} = \text{Consent Amount (₹)}$$
Contribution authorized by an MP for disaster relief from `Amount consented for Calamity`.

## 3. Financial Utilization Percentage (`utilization_pct`)

$$\text{Utilization \%} = \left( \frac{\text{Total Expenditure (Disbursed)}}{\text{Sanction Amount}} \right) \times 100$$

> [!IMPORTANT]
> Utilization is calculated strictly when numerator (Total Expenditure) and denominator (Sanction Amount) apply to the same entity/scope (e.g. project level or district aggregate). Project expenditure is **never** divided by an unrelated MP allocation.
