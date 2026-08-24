import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from '../../contexts/LanguageContext';
import { CONTACT_EMAIL } from '../../config/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useInView } from '@/hooks/use-in-view';
import { cn } from '@/lib/utils';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ContactProps {
  showHeading?: boolean;
}

const Contact = ({ showHeading = true }: ContactProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { ref, inView } = useInView<HTMLDivElement>();

  const contactSchema = z.object({
    name: z.string().trim().min(1, t('contact.errors.nameRequired')),
    email: z.string().trim().email(t('contact.errors.emailInvalid')),
    message: z.string().trim().min(10, t('contact.errors.messageMin')),
  });

  type ContactValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = (values: ContactValues) => {
    const subject = `${t('contact.title')} — ${values.name}`;
    const body = `${t('contact.name')}: ${values.name}\n${t('contact.email')}: ${values.email}\n\n${values.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast({
      title: t('contact.success'),
      description: t('contact.successDetail'),
    });
    form.reset();
  };

  return (
    <div id="contact" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'max-w-2xl mx-auto',
            inView ? 'animate-fade-in' : 'opacity-0'
          )}
        >
          {showHeading && (
            <h2 className="font-display text-3xl font-bold text-center mb-8 text-primary">
              {t('contact.title')}
            </h2>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.name')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('contact.message')}</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-accent hover:bg-accent-light text-white transition-all hover:-translate-y-0.5"
              >
                {t('contact.submit')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
