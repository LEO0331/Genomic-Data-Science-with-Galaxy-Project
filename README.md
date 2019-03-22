# Genomic-Data-Science-with-Galaxy-Project

The project analyzes DNA polymorphic sites of father-mother-child re-sequencing data constructed from an Illumina MiSeq sequencer sequenced as paired ends (R1/R2) to 125bp in length.

## Description of identifing polymorphic sites

**Stage 1 - Map the three sets of paired reads to the appropriate reference genome and create the workflow** 

step 1: Load dataset - input dataset, set "fastqsanger" format and "hg19" database 

step 2: Check quality - use FastQC (version: 0.72) to check the quality of the sequencing

step 3: Mapping - use Bowtie2 (version: 2.3.4.2) to map sequence to reference genome (hg19, paired end)

step 4: Add or replace read groups - label the mapping file using AddOrReplaceReadGroup (version: 2.18.2.1)

step 5: Merge - use MergeSamFiles (version: 2.18.2.1) to merge 3 individual mapping files (Bam)

step 6: Filter - use Filter (version: 2.4.1, JSON filter rules & Filtered BAM) to remove low quality mapping, MarkDuplicates (version:    2.18.2.1) to filter out duplicated mapping, and CleanSam (version: 2.18.2.1) to clean BAM dataset

step 7: Identify polymorphic sites - use FreeBayes (version: 1.1.0.46-0) to identify polymorphic sites based on hg19 genome 

step 8: Filter out false positive sites - use VCFfilter (version: 1.0.0_rc1+galaxy1) to select sites where the chance of a false positive call is equal to or better than 1 in 10,000

step 9: Extract the workflow and download the final vcf file for further analyses

**Stage 2 - Analyze data of polymorphic sites based on the vcf file**

step 10: Load data - set format (vcf) and genomic database (hg19)

step 11: Identify genes with polymorphic sites - use ANNOVAR Annotate VCF (version: 0.1) to annotate the vcf file

step 12: Identify the number of snp, mnp, del, ins or complex - use VCFfilter (version: 1.0.0_rc1+galaxy1) to select different types of polymorphism (e.g. -f "TYPE = snp", select snp only)

step 13: Count polymorphic sites - use Group (version: 2.1.1, by gene name) to count the number of polymorphic sites for each gene

step 14: Sort results in step 13 - use Sort (version: 1.1.0, by descending)

[WorkFlow](https://usegalaxy.org/u/lichengchen/w/workflow-constructed-from-history-chen-li-cheng-course-project-1)

[History for Analyses](https://usegalaxy.org:/u/lichengchen/h/chen-li-cheng-course-project)
